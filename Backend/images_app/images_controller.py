
from django.contrib.auth import authenticate
from images_app.images_filter import ImagesFilter
from images_app.images_serializers import ImagesSerializer
from hotel_app.models import Images
from user_auth.user_serializer import UserSerializer
from utils.reusable_methods import get_first_error_message, generate_six_length_random_number
from rest_framework.response import Response
from utils.helper import create_response, paginate_data
from utils.response_messages import *


class ImagesController:
    serializer_class = ImagesSerializer
    filterset_class = ImagesFilter

 
    def create(self, request):
        try:
            request.POST._mutable = True
            request.data["created_by"] = request.user.guid
            request.POST._mutable = False

            # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
            validated_data = ImagesSerializer(data=request.data)
            if validated_data.is_valid():
                response = validated_data.save()
                response_data = ImagesSerializer(response).data
                return Response({'data': response_data}, 200)
            else:
                error_message = get_first_error_message(validated_data.errors, "UNSUCCESSFUL")
                return Response({'data': error_message}, 400)
            # else:
            #     return Response({'data': "Permission Denaied"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)

    # mydata = Member.objects.filter(firstname__endswith='s').values()
    def get_images(self, request):
        try:
             if "AnimatedImagaesHome" in request.query_params:
                images = Image.objects.filter(category=AnimatedImagaesHome) 
            # if "CarouselImage" in request.query_params:
            # instances = self.serializer_class.Meta.model.objects.all()

            filtered_data = self.filterset_class(request.GET, queryset=instances)
            data = filtered_data.qs

            paginated_data, count = paginate_data(data, request)

            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }
            return create_response(response_data, "SUCCESSFUL", 200)


        except Exception as e:
            return Response({'error': str(e)}, 500)

    def update_images(self, request):
        try:
            if "id" in request.data:
                # finding instance
                instance = Images.objects.filter(id=request.data["id"]).first()

                if instance:
                    request.POST._mutable = True
                    request.data["updated_by"] = request.user.guid
                    request.POST._mutable = False

                    # updating the instance/record
                    serialized_data = ImagesSerializer(instance, data=request.data, partial=True)
                    # if request.user.role in ['admin', 'manager'] or request.user.is_superuser:  # roles
                    if serialized_data.is_valid():
                        response = serialized_data.save()
                        response_data = ImagesSerializer(response).data
                        return Response({"data": response_data}, 200)
                    else:
                        error_message = get_first_error_message(serialized_data.errors, "UNSUCCESSFUL")
                        return Response({'data': error_message}, 400)
                    # else:
                    #     return Response({'data': "Permission Denaied"}, 400)
                else:
                    return Response({"data": "NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)

        except Exception as e:
            return Response({'error': str(e)}, 500)

    def delete_images(self, request):
        try:
            if "id" in request.query_params:
                instance = Images.objects.filter(id=request.query_params['id']).first()

                if instance:
                    instance.delete()
                    return Response({"data": "SUCESSFULL"}, 200)
                else:
                    return Response({"data": "RECORD NOT FOUND"}, 404)
            else:
                return Response({"data": "ID NOT PROVIDED"}, 400)
        except Exception as e:
            return Response({'error': str(e)}, 500)
