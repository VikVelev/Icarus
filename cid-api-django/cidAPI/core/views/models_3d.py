from django.http import HttpResponse
from django.http import Http404
from django.http import FileResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions, generics, mixins

from ..models.models_3d import Model3D
from ..models.commit import Commit
from ..serializers import Model3DSerializer
import pprint
import mimetypes

class ListAllModels3D(generics.ListAPIView):

    serializer_class = Model3DSerializer

    def get_queryset(self):
        queryset = Model3D.objects.all()
        model_id = self.request.query_params.get('id', None)

        if model_id is not None:
            queryset = queryset.filter(pk=model_id)
    
        return queryset

class RemoveModel3D(generics.DestroyAPIView):

    serializer_class = Model3DSerializer

    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        print(self.kwargs)
        # TODO Implement user validation
        # FIXME
        print(self.request.user)
        # END OF TODO
        return Model3D.objects.filter(owners__in=[user_pk])


class Models3D( mixins.ListModelMixin,
                mixins.CreateModelMixin,
                generics.GenericAPIView,
            ):

    serializer_class = Model3DSerializer

    def get_queryset(self):
        user_pk = self.kwargs["pk"]
        # TODO This is easy implement for post fetching so I don't have to do multiple queries
        # FIXME
        print(self.request.user)
        # END OF TODO
        return Model3D.objects.filter(owners__in=[user_pk])

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

    def perform_create(self, serializer):
        # FIXME: this is a bad way to set the value, but ...
        user_id = self.kwargs["pk"]
        serializer.validated_data['owners'].append(user_id)

        serializer.save()

class CommitFile(generics.GenericAPIView):
    def get(self, request, *args, **kwargs):
        model_id = self.kwargs["pk"]
        file = Commit.objects.get(id=model_id).new_version
        file_mime = mimetypes.guess_type(str(file))
        return FileResponse(file, content_type=file_mime[0])


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