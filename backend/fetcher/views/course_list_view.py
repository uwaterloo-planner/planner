from rest_framework.views import APIView
from rest_framework.response import Response
from ..models import RawCourse
from ..serializers import CourseSerializer

class CourseListView(APIView):
    def get(self, _):
        serializer = CourseSerializer(RawCourse.objects, many=True)
        return Response(serializer.data)
