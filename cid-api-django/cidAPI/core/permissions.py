from rest_framework.permissions import BasePermission, SAFE_METHODS
from .models.models_3d import Model3D

class IsAdminOrReadOnly(BasePermission):
    
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        else:
            return request.user.is_staff

# This permission is only for 3D models
class IsOwnerOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        owners = Model3D.objects.all().filter(id=obj.id).values("owners")

        for owner in owners:       
            if owner["owners"] == request.user.id:               
                return True

        print("Denied access to %s, who tried to modify %s " % (request.user, obj))
        return False

# OP stands for Original Poster. This is for posts only.
class IsOPOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
            
        return obj.posted_by == request.user


class IsOCOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
            
        return obj.committed_by == request.user

class IsModelOwned(BasePermission):
    def has_object_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True

        # Check if you are among the model you are trying to commit's owners
        return True

class IsMeOrReadOnly(BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        
        return obj == request.user