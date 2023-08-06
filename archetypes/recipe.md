---
title: {{ .Site.Data.recipe.title }}
summary: {{ .Site.Data.recipe.summary }}

linkout: {{ .Site.Data.recipe.linkout }}

tags:
{{ range $existing_tag := (split .Site.Data.recipe.new_tags "\n" | union .Site.Data.recipe.existing_tags | uniq) -}}
{{ with $existing_tag }}- {{ lower $existing_tag }}{{ end }}
{{ end -}}

servings: {{ .Site.Data.recipe.servings }}
time: {{ .Site.Data.recipe.time }}

ingredients:
{{ .Site.Data.recipe.ingredients }}

directions:
{{ .Site.Data.recipe.directions }}
---
