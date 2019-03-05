Rails.application.routes.draw do

  devise_for :admins, :controllers => { :registrations => "registrations", :sessions => "sessions"}
  resources :admins

  devise_scope :admin do
    get "/acceder" => "devise/sessions#new"
  end

  get 'panel/panel' => 'panel#panel', :as => :panel
  get 'panel/principal' => 'panel#principal', :as => :panel_princ
  get 'panel/index' => 'panel#index', :as => :panel_index
  get 'panel/generar' => 'panel#generar', :as => :panel_nuevo
  get 'panel/editar' => 'panel#editar', :as => :panel_editar
  post 'panel' => 'panel#crear'
  put 'panel/editar' => 'panel#actualizar'
  patch 'panel/editar' => 'panel#actualizar'
  post 'panel/video_manage' => 'panel#actualizar_videos'
  put 'panel/video_manage' => 'panel#actualizar_videos'
  patch 'panel/video_manage' => 'panel#actualizar_videos' 
  get 'panel/:id' => 'panel#mostrar', :as => :panel_mostrar
  delete 'panel/:id' => 'panel#eliminar', :as => :panel_eliminar

  get '/catalogo_videos' => 'principal#get_videos', :as => :catalogo

  get 'tecnologia_educativa/principal' => 'tecnologia_educativa#principal', :as => :tech_ed

  get 'produccion_digital/cursos_breves' => 'produccion_digital#cursos_breves', :as => :cursos_breves

  get 'digital_design/principal' => 'digital_design#principal', :as => :digital_design

  get 'coordinacion/principal' => 'coordinacion#principal', :as => :coordinacion

  get 'produccion_digital/principal' => 'produccion_digital#principal', :as => :principal_pd

  get '/produccion_digital/curso_breve/reproducir' => 'produccion_digital#reproducir', :as => :curso1

  get 'principal/inicio'


  #devise_for :admins, :controllers => { :registrations => "registrations", :sessions => "sessions"}
  get 'videos/id' => 'videos#id', :as => :video_id
  resources :videos
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".



  # You can have the root of your site routed with "root"
  root  to: 'principal#soon'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
