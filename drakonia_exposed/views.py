from django.shortcuts import render
from django.template.loader import get_template
from django.template import Context
from django.http import HttpResponse

import os.path

def index(request):
    t = get_template('index.html')
    c = dict({'path':request.path,
                })
    html = t.render(c)
    return HttpResponse(html)
#	return render(request, 'index.html')

