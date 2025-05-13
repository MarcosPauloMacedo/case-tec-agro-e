from django.test import TestCase
from .models import Product
from .serializers import ProductSerializer

class ProductSerializerTestCase(TestCase):

    def setUp(self):
        # Dados iniciais para os testes
        self.valid_data = {"name": "Produto Válido", "price": 10.50}
        self.invalid_name_data = {"name": "", "price": 10.50}
        self.invalid_price_data = {"name": "Produto Inválido", "price": ""}

    def test_create_product_with_valid_data(self):
        """Teste para criar um produto com dados válidos usando o serializer"""
        serializer = ProductSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        product = serializer.save()
        self.assertEqual(product.name, self.valid_data["name"])
        self.assertEqual(product.price, self.valid_data["price"])

    def test_create_product_with_invalid_name(self):
        """Teste para validar nome vazio usando o serializer"""
        serializer = ProductSerializer(data=self.invalid_name_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("name", serializer.errors)
        self.assertIn("Este campo não pode ser em branco.", serializer.errors["name"][0])

    def test_create_product_with_invalid_price(self):
        """Teste para validar preço vazio usando o serializer"""
        serializer = ProductSerializer(data=self.invalid_price_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn("price", serializer.errors)
        self.assertIn("Um número válido é necessário.", serializer.errors["price"][0])

    def test_update_product_with_serializer(self):
        """Teste para atualizar um produto usando o serializer"""
        product = Product.objects.create(name="Produto Antigo", price=20.00)
        update_data = {"name": "Produto Atualizado", "price": 25.00}
        serializer = ProductSerializer(product, data=update_data)
        self.assertTrue(serializer.is_valid())
        updated_product = serializer.save()
        self.assertEqual(updated_product.name, update_data["name"])
        self.assertEqual(updated_product.price, update_data["price"])

    def test_delete_product_with_serializer(self):
        """Teste para deletar um produto usando o serializer"""
        product = Product.objects.create(name="Produto Para Deletar", price=30.00)
        product_id = product.id 
        product.delete()  
        with self.assertRaises(Product.DoesNotExist):
            Product.objects.get(id=product_id) 

    def test_list_products_with_serializer(self):
        """Teste para listar produtos usando o serializer"""
        Product.objects.create(name="Produto 1", price=10.00)
        Product.objects.create(name="Produto 2", price=20.00)
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        self.assertEqual(len(serializer.data), 2)
        self.assertEqual(serializer.data[0]["name"], "Produto 1")
        self.assertEqual(serializer.data[1]["name"], "Produto 2")

    def test_retrieve_product_by_id(self):
        """Teste para buscar um produto pelo ID usando o serializer"""
        product = Product.objects.create(name="Produto Teste", price=50.00)
        product_id = product.id  
        retrieved_product = Product.objects.get(id=product_id)  
        serializer = ProductSerializer(retrieved_product)
        self.assertEqual(serializer.data["name"], "Produto Teste")
        self.assertEqual(serializer.data["price"], "50.00") 

 


