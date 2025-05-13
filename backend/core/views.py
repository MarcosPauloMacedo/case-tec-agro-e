from django.core.cache import cache
from rest_framework import viewsets
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
from rest_framework.permissions import IsAuthenticated

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        cache_key = "product_list"
        cached_data = cache.get(cache_key)

        if cached_data:
            print("Cache hit")
            return Response(cached_data)

        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        cache.set(cache_key, data, timeout=60 * 10)  # 10 minutos
        return Response(data)

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.delete("product_list")
        return response

    def update(self, request, *args, **kwargs):
        response = super().update(request, *args, **kwargs)
        cache.delete("product_list")
        return response

    def destroy(self, request, *args, **kwargs):
        response = super().destroy(request, *args, **kwargs)
        cache.delete("product_list")
        return response
