from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'main/index.html')

def noticeboard(request):
    # noticeboard 뷰의 내용
    return render(request, 'main/noticeboard.html')

def signin(request):
    return render(request, 'main/signin.html')

def signup(request):
    return render(request, 'main/signup.html')


def developer(request):
    return render(request, 'main/developer.html')