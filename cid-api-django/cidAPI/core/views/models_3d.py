from django.http import HttpResponse
from django.http import Http404
from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.models_3d import Model3D
from ..models.commit import Commit

from ..serializers.model3d_serializers import Model3DSerializer, ModelViewSerializer
from ..permissions import IsOwnerOrReadOnly
import pprint
import mimetypes

class ListAllModels3D(generics.ListAPIView):
    
    serializer_class = Model3DSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)    

    def get_queryset(self):
        queryset = Model3D.objects.all()
        model_id = self.request.query_params.get('id', None)

        if model_id is not None:
            queryset = queryset.filter(pk=model_id)
    
        return queryset

class ViewModel(generics.GenericAPIView, 
                mixins.UpdateModelMixin) :

    serializer_class = ModelViewSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def get_queryset(self):
        model_id = self.request.query_params.get("model_id", None)

        if model_id is not None:
            queryset = Model3D.objects.filter(id=model_id)
        else:
            queryset = None
        
        return queryset
    
    def get_object(self):
        queryset = self.get_queryset()
    
        pk = self.request.query_params.get('model_id', None)
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)

        return obj

    def get(self, request, *args, **kwargs):
        if self.get_queryset().first() is not None:
            return Response({
                "id" : self.get_queryset().first().id,
                "viewcount": self.get_queryset().first().viewcount
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "error": "Model not found."
            },status=status.HTTP_404_NOT_FOUND)

    def patch(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def perform_update(self, serializer):
        viewcount = self.get_object().viewcount + 1
        serializer.validated_data["viewcount"] = viewcount
        serializer.save()


class TrendingModels3D( generics.ListAPIView ):
    serializer_class = Model3DSerializer
    permission_classes = ( permissions.IsAuthenticated, )
    queryset = Model3D.objects.all().order_by("viewcount").reverse()

class ForkModels3D( generics.GenericAPIView ):
    serializer_class = Model3DSerializer # ForkModelSerializer pls
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Model3D.objects.all()
    # urls, 
    # alg: check if it is already forked, 
    # increase the forked object's forkcount
    # create a new Model3D instance with the issuer as the owner
    # all commits should be the same
    
class Models3D( mixins.ListModelMixin,
                mixins.CreateModelMixin,
                mixins.DestroyModelMixin,
                mixins.UpdateModelMixin,
                generics.GenericAPIView,
            ):
    serializer_class = Model3DSerializer
    permission_classes = (permissions.IsAuthenticated, IsOwnerOrReadOnly)    

    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        queryset = Model3D.objects.filter(owners__in=[user_pk])

        verbose = self.request.query_params.get('v', None) # Just for debugging purposes

        return queryset

    #This is because https://stackoverflow.com/questions/49331003/django-drf-delete-retrieve-patch-returns-404-detail-not-found/49340753#49340753
    def get_object(self):
        queryset = self.get_queryset()
    
        pk = self.request.query_params.get('id', None)
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)

        return obj

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):      
        return self.update(request, *args, **kwargs)

    def patch(self, request, *args, **kwargs):      
        return self.partial_update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):     
        return self.destroy(request, *args, **kwargs)

    def perform_create(self, serializer):
        user_id = self.request.user.id
        serializer.validated_data['owners'] = [user_id]
        serializer.save()

# This is essentially useless but I did it for debugging HTTP Headers.
def pretty_request(request):

    headers = ''

    for header, value in request.META.items():
        if not header.startswith('HTTP'):
            continue
        header = '-'.join([h.capitalize() for h in header[5:].lower().split('_')])
        headers += '{}: {}\n'.format(header, value)

    return (
        '{method} HTTP/1.1\n'
        'Content-Length: {content_length}\n'
        'Content-Type: {content_type}\n'
        '{headers}\n\n'
        '{body}'
    ).format(
        method=request.method,
        content_length=request.META['CONTENT_LENGTH'],
        content_type=request.META['CONTENT_TYPE'],
        headers=headers,
        body=request.body,
    )
