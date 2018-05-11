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
    containment: "parent",
    cancel: false
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
  $('.open-map, .map-warpper > span, .custom-map-btn').click(function(){
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
    $('.categories-cards, #single .place-details').mCustomScrollbar({
      theme: "inset",
      mouseWheelPixels: 200,
      // scrollInertia: .1,
      scrollButtons:{ enable: true }
    });
    // Fix Single Catg Row
    $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');
  } else {
    $('.categories-cards, .place-details, .result-cards, header > nav > ul, #cities, #single .place-details').mCustomScrollbar({
      theme: "inset",
      mouseWheelPixels: 200,
      // scrollInertia: .1,
      scrollButtons:{ enable: true }
    });
  }

  $(window).resize(function(){
    var width = $(window).width();
    if ( (width <= 767) ) {
      $('.categories-cards').mCustomScrollbar({
        theme: "inset",
        mouseWheelPixels: 200,
        // scrollInertia: .1,
        scrollButtons:{ enable: true }
      });
      // Fix Single Catg Row
      $('.single-card.asGrid').removeClass('asGrid').addClass('asRow');


    } else {
      $('.categories-cards, .place-details, .result-cards, header > nav > ul, #cities, #single .place-details').mCustomScrollbar({
        theme: "inset",
        mouseWheelPixels: 200,
        // scrollInertia: .1,
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
  $('.single-category.notClicked').click(function(){
    $('.single-category').removeClass('clicked').addClass('notClicked').css('opacity', .7);
    $(this).closest('.single-category').removeClass('notClicked').addClass('clicked').css('opacity', 1);
  });
  $('.close-catg').click(function(e){
    console.log('close card')
    e.stopPropagation()
    $('.single-category').removeClass('clicked').addClass('notClicked').css('opacity', 1)
  });


  // show menu
  $('.menu .full').click(function(){
    $('.menu .full').remove()
    $('.menu').height($('.menu').prop("scrollHeight"))
  })

  $(document).mouseup(function(e) {
      var container = $('.single-category');

      // if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) && container.has(e.target).length === 0){
        $('.single-category').removeClass('clicked').addClass('notClicked').css('opacity', 1)
      }
  });

  $('.branches-cards .single-branch').click(function(){
      $(this).toggleClass('open')
  })

  introJs().start();

});
