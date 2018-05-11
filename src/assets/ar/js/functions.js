$(document).ready(function(){

  // Close Menu
  $('.nav-footer h1').click(function(){
    $('header').toggleClass('closed');
    $('i', this).toggleClass('ion-ios-arrow-thin-left ion-ios-arrow-thin-right');
  });
  $('header > nav > ul > li, header > nav > ul > a > li, .mobileMenuToggler').click(function(){
    if ($('header').hasClass('closed')) {
        $('header').removeClass('closed');
        $('.nav-footer h1 i').toggleClass('ion-ios-arrow-thin-left ion-ios-arrow-thin-right');
    }
  });

  // View More button
  $('.viewMore').click(function(){
    $(this).remove();
    $('.all-catg').fadeIn()
  });

  // Kill #
  $('a[href="#"]').click(function(event){
    event.preventDefault();
  });

  // All Categories Show
  $('.viewAll').click(function(){
    $('#categories, #searchInput, section.logo').fadeOut(function(){
      $('#Allcategories').fadeIn();
    });
  });
  $('.hideAll').click(function(){
    $('#Allcategories').fadeOut(function(){
      $('#categories, #searchInput, section.logo').fadeIn();
    });
  });

  // SideNav Functions
  $('nav > ul > a > li').click(function(){

    // To Change Toggling Options
    // $('nav > ul  a > li').removeClass('active').promise().done(function(){
    //   $(this).parent().next('ul.submenu').slideUp('fast');
    // });

    $(this).toggleClass('active').promise().done(function(){
      $(this).parent().next('ul.submenu').slideToggle('fast');
      if ($(this).hasClass('active')) {
        $(this).find('.ion-android-add').css('transform', 'rotate(45deg)');
      }else {
        $(this).find('.ion-android-add').css('transform', 'rotate(0deg)');
      }
    });
  });

  // Slider
  $('.carousel').carousel()

  // Drag Menu icon
  $( "#draggable" ).draggable({
    containment: "parent"
  });

  // Switch between Grid and Rows
  $('.ads .controller .ion-navicon').click(function(){
    $('.categories-cards .single-card').removeClass('asGrid').addClass('asRow');
    $('.ads .controller .ion-grid, .ads .controller .ion-navicon').removeClass('active');
    $(this).addClass('active');
  });
  $('.ads .controller .ion-grid').click(function(){
    $('.categories-cards .single-card').removeClass('asRow').addClass('asGrid');
    $('.ads .controller .ion-grid, .ads .controller .ion-navicon').removeClass('active');
    $(this).addClass('active');
  });

  // Map Toggler
  $('.open-map, .map-warpper > span').click(function(){
    $('.map-warpper').fadeToggle();
  });

  // Form Inputs
  $('.adv-form .input-group input, .adv-form .input-group textarea').focusout(function(){
    var text_val = $(this).val();
    if(text_val === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
  });


  // Custome Scroll
  // When resize window
  var width = $(window).width();
  if ( (width <= 767) ) {
    $('.categories-cards, header > nav > ul, #single .place-details').mCustomScrollbar({
      theme: "inset",
      scrollButtons:{ enable: true }
    });
    // Fix Single Catg Row
    $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
  } else {
    $('.categories-cards, .place-details, .result-cards, header > nav > ul, #cities, #single .place-details').mCustomScrollbar({
      theme: "inset",
      scrollButtons:{ enable: true }
    });
  }

  $(window).resize(function(){
    var width = $(window).width();
    if ( (width <= 767) ) {
      $('.categories-cards, #single .place-details').mCustomScrollbar({
        theme: "inset",
        scrollButtons:{ enable: true }
      });
      // Fix Single Catg Row
      $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
    } else {
      $('.categories-cards, .place-details, .result-cards, header > nav > ul, #cities, #single .place-details').mCustomScrollbar({
        theme: "inset",
        scrollButtons:{ enable: true }
      });
    }
  });

  // Mobile View
  var mobileWidth = $(window).width();
  if ( (mobileWidth <= 479) ) {
    $('.categories-cards').mCustomScrollbar("destroy");
    $('header nav').mCustomScrollbar();
    // Fix Single Catg Row
    $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
  }
  $(window).resize(function(){
    var mobileWidth = $(window).width();
    if ( (mobileWidth <= 479) ) {
      $('.categories-cards').mCustomScrollbar("destroy");
      $('header nav').mCustomScrollbar();
      // Fix Single Catg Row
      $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
    }
  });

  // Close instructions
  $('.close-inst').click(function(){
    $('.instructions').fadeOut(function(){
      $(this).next().removeClass('heighlighted');
      $(this).remove();
    });
  });

  // Home Page - Hover Effect
  $('.single-category.notClicked .name').click(function(){
    $('.single-category').removeClass('clicked').addClass('notClicked');
    $(this).parent().parent().removeClass('notClicked').addClass('clicked');
  });
  $('.close-catg').click(function(){
    $('.single-category').removeClass('clicked').addClass('notClicked');
  });

});
