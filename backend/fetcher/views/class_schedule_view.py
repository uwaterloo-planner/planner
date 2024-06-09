from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import RawClass
from ..serializers import ClassListSerializer

class ClassScheduleView(APIView):
    def get(self, request) -> Response:
        courses = request.GET.get('courses', '').split(',')[:6]
        classes_data = [RawClass.objects.filter(course_id__iexact=id) for id in courses]

        serializer = ClassListSerializer(classes_data, many=True)
        return Response(serializer.data)
