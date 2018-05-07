from django.http import HttpResponse
from django.http import Http404
from django.http import FileResponse
from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.models_3d import Model3D
from ..models.commit import Commit

from ..serializers.model3d_serializers import Model3DSerializer, ModelViewSerializer, ForkModelSerializer
from ..permissions import IsOwnerOrReadOnly
from pprint import pprint
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

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        model_id = self.request.query_params.get('id', None)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)

        if model_id is not None and not self.get_queryset().all():
            return Response({
                'error': 'Not Found'
            }, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.data)

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

class ForkModel( generics.GenericAPIView, mixins.CreateModelMixin ):
    serializer_class = ForkModelSerializer
    permission_classes = (permissions.IsAuthenticated, )

    def is_forked_by_you(self):
        your_models = Model3D.objects.filter(owners__in=[self.request.user,])
        model_fork = self.get_object()

        for model in your_models:
            if model.fork_of == self.get_object():
                return True
        
        return False

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
        return Response({
            'is_forked_by_you':self.is_forked_by_you()
        })

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = self.get_object()
        
        if not self.is_forked_by_you():

            #Increment the forkcount
            data.forkcount = data.forkcount + 1
            data.save()

            created = Model3D.objects.create(
                title = "Fork#%s of %s" % (str(data.forkcount), data.title),
                description = data.description,
                is_fork = True,
                fork_of = data,
                nth_commit = len(data.commits.all())
            )
            
            created.owners.set([self.request.user,])
            
            created.save()

            for commit in data.commits.all():
                Commit.objects.create(
                    title=commit.title,
                    belongs_to_model=created,
                    new_version=commit.new_version,
                    new_textures=commit.new_textures,
                    committed_by=commit.committed_by,
                    details=commit.details
                )

            return Response({
                'id': created.id,
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'info': "Already forked by you",
            }, status=status.HTTP_204_NO_CONTENT) 
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

    #https://stackoverflow.com/questions/49331003/django-drf-delete-retrieve-patch-returns-404-detail-not-found/49340753#49340753
    def get_object(self):
        queryset = self.get_queryset()
    
        pk = self.request.query_params.get('id', None)
        obj = get_object_or_404(queryset, pk=pk)
        self.check_object_permissions(self.request, obj)

        return obj

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        #TODO Fix the issue with the model creation and initial commit
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
