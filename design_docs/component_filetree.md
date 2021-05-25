


components/header
components/footer

maps/trips_index_map
maps/trip_show_map
maps/postcard_show_map


## Landing page/Trip index page which will implement trips index_container, trips_index_map, header, footer
landing/landing_container
landing/landing
  components/header
  trips/trips_index_container
  trips/trips_index
  trips/trips_index_item
  maps/trips_index_map
  components/footer

## Trips show page which will implement trip_show_map, postcards_index_container
trips/trip_show_container
trips/trip_show
  <!-- postcards/postcards_index_container -->
  postcards/postcards_index
  postcards/postcards_index_item
  maps/trip_show_map

## Postcard show page which will implement postcard_show_map and postcard_show_container
postcards/postcard_show_container
postcards/postcard_show
  maps/postcard_show_map
  postcard_image


## Trip Form 
  trip_create_container
  trip_edit_container
  trip_form

## Postcard Form
  postcard_create_container
  postcard_edit_container
  postcard_form
