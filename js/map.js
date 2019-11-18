$(window).resize(function () {
  var h = $(window).height(),
    offsetTop = 110; // Calculate the top offset

  $('#mapCanvas').css('height', (h - offsetTop));
}).resize();

$(function() {

  CartoDbLib.initialize({
    map_centroid: [41.881832, -87.623177],
    defaultZoom:  11,
    layerUrl:     'https://datamade.carto.com/api/v2/viz/517f68fb-bd82-40f9-bd5e-356fabd5d8ac/viz.json',
    tableName:    'ordinance_violations_vacant_abandoned_buildings_merge',
    userName:     'datamade',
    fields :      'cartodb_id, the_geom, sr_number, parent_sr_number, status, closed_date, created_date, duplicate, last_modified_date, legacy_record, legacy_sr_number, sr_type, street_address, police_beat, police_district, police_sector, precinct, community_area, ward, zip_code, violation_code, violation_date,violation_description,respondents,imposed_fine,hearing_date,docket_number,case_disposition', });

  var autocomplete = new google.maps.places.Autocomplete(document.getElementById('search-address'));
  var modalURL;

  $('#btnSearch').click(function(){
    // Temporary fix for map load issue: set show map as default.
    if ($('#mapCanvas').is(":visible")){
      CartoDbLib.doSearch();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#mapCanvas').show();
      $('#listCanvas').hide();
      CartoDbLib.doSearch();
    }
  });

  $(':checkbox').click(function(){
    CartoDbLib.doSearch();
  });

  $(':radio').click(function(){
    CartoDbLib.doSearch();
  });

  $('#btnViewMode').click(function(){
    if ($('#mapCanvas').is(":visible")){
      $('#btnViewMode').html("<i class='fa fa-map-marker'></i> Map view");
      $('#listCanvas').show();
      $('#mapCanvas').hide();
    }
    else {
      $('#btnViewMode').html("<i class='fa fa-list'></i> List view");
      $('#listCanvas').hide();
      $('#mapCanvas').show();
    }
  });

  $("#search-address").keydown(function(e){
      var key =  e.keyCode ? e.keyCode : e.which;
      if(key == 13) {
          $('#btnSearch').click();
          return false;
      }
  });

  $(".close-btn").on('click', function() {
    $.address.parameter('modal_id', null)
  });

});