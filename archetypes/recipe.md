---
title: {{ .Site.Data.recipe.title }}
summary: {{ .Site.Data.recipe.summary }}

linkout: {{ .Site.Data.recipe.linkout }}

tags:
{{ range $tag := (split .Site.Data.recipe.new_tags "\n" | union .Site.Data.recipe.existing_tags | uniq) -}}
{{ with $tag }}- {{ lower . }}{{ end }}
{{ end -}}

servings: {{ .Site.Data.recipe.servings }}
time: {{ .Site.Data.recipe.time }}

ingredients:
{{ .Site.Data.recipe.ingredients }}

directions:
{{ .Site.Data.recipe.directions }}
---
