from rest_framework.routers import DefaultRouter
from backend.assignment.views import AssignmentViewSet

router = DefaultRouter()
router.register(r'', AssignmentViewSet, basename='assignments')
urlpatterns = router.urls
