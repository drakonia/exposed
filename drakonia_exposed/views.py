from django.shortcuts import render
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse


def index(request):
	return render(request, 'index.html')
    #return render(request, 'drakonia_exposed/index.html')
	
