# petitepausecafe.fr

Cahier des charges API
| Requête | Route | Implémentation |
|:--:|--|:--:|
| GET | / | ✅ |
| GET | /articles | ✅ |
| GET | /articles/{slug} | ✅ |
| GET | /comments | ✅ |
| GET | /comments/{id} | ✅ |
| GET | /users | ✅ |
| GET | /users/{id} | ✅ |
| GET | /categories | ✅ |
| GET | /categories/{id} | ✅ |
| GET | /roles | ✅ |
| GET | /roles/{id} | ✅ |
| GET | /dashboard | ✅ |
| POST | /articles/create | ✅ |
| PUT | /manage/articles/edit/{id} | ✅ |
| PUT | /manage/articles/delete/{id} (soft delete) | ❌ | ❌ |
| DELETE | /manage/articles/destroy/{id} | ✅ |
| POST | /comments/ | ✅ |
| PUT | /manage/comments/edit/{id} | ❌ |
| PUT | /comments/delete/{id} (soft delete) | ✅ |
| DELETE | /manage/comments/destroy/{id} | ❌ |
| POST | /register/ | ✅ |
| PUT | /users/{email} | ✅ |
| PUT | /manage/users/delete/{id} (soft delete) | ❌ |
| DELETE | /users/{email} | ✅ |
| POST | /manage/categories/create | ❌ |
| PUT | /manage/categories/edit/{id} | ✅ |
| PUT | /manage/categories/delete/{id} (soft delete) | ❌ |
| DELETE | /manage/categories/destroy/{id} | ❌ |
| POST | /manage/roles/create | ❌ |
| PUT | /manage/roles/edit/{id} | ✅ |
| PUT | /manage/roles/delete/{id} (soft delete) | ❌ |
| DELETE | /manage/roles/destroy/{id} | ❌ |
