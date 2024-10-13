
from django.contrib.auth import authenticate
from images_app.images_filter import ImagesFilter
from images_app.images_serializers import ImagesSerializer
from images_app.models import Images
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

    
    def get_images(self, request):
        try:
            images = None  # Initialize images to None
            
            # Check for different query params and filter accordingly
            if "category" in request.query_params:
                if request.query_params.get('category') == "bannerimagaeshome":
                    images = Images.objects.filter(category='bannerimagaeshome')
                elif request.query_params.get('category') == "animatedimagaeshome":
                    images = Images.objects.filter(category='animatedimagaeshome')
                elif request.query_params.get('category') == "meetingsandeventshome":
                    images = Images.objects.filter(category='meetingsandeventshome')
                elif request.query_params.get('category') == "featuredamenitieshome":
                    images = Images.objects.filter(category='featuredamenitieshome')
                elif request.query_params.get('category') == "exploretheroomshome":
                    images = Images.objects.filter(category='exploretheroomshome')
                elif request.query_params.get('category') == "gallerysliderhome":
                    images = Images.objects.filter(category='gallerysliderhome')
                elif request.query_params.get('category') == "meetingsroomsgroupshome":
                    images = Images.objects.filter(category='meetingsroomsgroupshome')
            else:
                images = Images.objects.all()

            
            # if images is None:
            #     return Response({'error': 'No valid query parameter found.'}, status=400)

            # Filtering data
            filtered_data = self.filterset_class(request.GET, queryset=images)
            data = filtered_data.qs

            # Pagination
            paginated_data, count = paginate_data(data, request)

            # Serialize the data
            serialized_data = self.serializer_class(paginated_data, many=True).data
            response_data = {
                "count": count,
                "data": serialized_data,
            }

            # Successful response
            return create_response(response_data, "SUCCESSFUL", 200)

        except Exception as e:
            return Response({'error': str(e)}, status=500)

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
