(function ($, once) {
  'use strict';
  let page = 0;

  function getParameterByName(name, url) {
    if (!url) {
      url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    let regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  // $(document).ready(function () {
  //   if ($('#views-exposed-form-01-ocean-topics-default').length) {
  //     $(".view--_1-ocean-topics.view--display-default").before($('.pop-list'));
  //
  //     let id = $('.pop-list .active').attr('id');
  //
  //     let filter = $('#views-exposed-form-01-ocean-topics-default select[name="field_op_generated_tags_target_id"]');
  //     $(filter).val(id);
  //
  //     $(filter).trigger('change');
  //     $('#views-exposed-form-01-ocean-topics-default input.button.js-form-submit').trigger('click');
  //
  //     $('#views-exposed-form-01-ocean-topics-default .pop-list').remove();
  //   }
  // });


  Drupal.behaviors.oceanPager = {
    attach: function (context, settings) {
      $(once('topicsPager', '.view--_1-ocean-topics', context)).each(function () {
        $('.view--_1-ocean-topics .pager ul li a').on('click', function (e) {
          page = getParameterByName('page', $(this).attr('href'));
        });
      });

      $(once('lessonPager', '.view--_1-ocean-lesson-plans-search', context)).each(function () {
        $('.view--_1-ocean-lesson-plans-search .pager ul li a').on('click', function (e) {
          page = getParameterByName('page', $(this).attr('href'));
        });
      });

      $(once('searchPager', '.view--op-site-search .pager', context)).each(function () {
        // page = getParameterByName('page', $(this).attr('href'));
        // alert(page);
        $('.view--op-site-search .pager li.is-active').addClass('active');
        // $(".pager li a[title='Go to page 1']").parent().addClass('active');
      });
    }
  };


  /**
   * Set active class on Views AJAX filter
   * on selected category
   */
  Drupal.behaviors.exposedfilter_buttons = {
    attach: function (context, settings) {

      $(once('topics', '.view--_1-ocean-topics.view--display-default', context)).each(function () {
        $('.filter-tab a').on('click', function (e) {
          e.preventDefault();

          // Get ID of clicked item
          let id = $(e.target).attr('id');

          setFilter(id, e);
        });
      });

      $(once('lesson_plans', '.view--_1-ocean-lesson-plans.view--display-default', context)).each(function () {
        $(".view--_1-ocean-lesson-plans.view--display-default").before($('<fieldset class="pop-list filter-tab" id="radio-grade-level--wrapper"></fieldset>'));

        $('<legend>Grade Level</legend>').appendTo('#radio-grade-level--wrapper');
        $('<div class="fieldset__content"></div>').appendTo('#radio-grade-level--wrapper');


        $("#edit-field-grade-level-target-id > option").each(function () {
          $('<div class="form-item--radio" id="radio-' + this.value + '"></div>').appendTo('#radio-grade-level--wrapper .fieldset__content');

          if (this.text == '- Any -') {
            this.text = 'All';
            let checked = ' checked="checked"';
          }
          else {
            let checked = '';
          }

          let radioBtn = $('<input' + checked + ' class="filter-tab form-item__radio" type="radio" value="' + this.value + '" id="' + this.value + '" name="radios" />');
          $(radioBtn).appendTo('#radio-' + this.value);

          $('<label class="form-item__label">' + this.text + '</label>').appendTo('#radio-' + this.value);
        });

        $(".view--_1-ocean-lesson-plans.view--display-default").before($('<div class="checkboxes-lesson-subject--wrapper" id="lesson-plan-subjects"><label>Subject</label></div>'));

        $("#edit-field-term-lesson-subject-target-id > option").each(function () {
          $('<div class="select-item highlight" id="select-' + this.value + '"></div>').appendTo('#lesson-plan-subjects');

          let select = $('<input class="filter-tab form-item__checkbox" type="checkbox" value="' + this.value + '" id="' + this.value + '" name="checkboxes" />');
          $(select).appendTo('#select-' + this.value);

          $('<label class="form-item__label">' + this.text + '</label>').appendTo('#select-' + this.value);
        });

        $('input.filter-tab').parent().on('click', function (e) {
          e.preventDefault();

          // Get ID of clicked item
          let id = $(this).children('input').attr('value');

          setFilterSearch(id, e);
        });
      });

      $(once('search', '#views-exposed-form-op-site-search-default', context)).each(function () {
        $('.filter-tab a').on('click', function (e) {
          e.preventDefault();

          // Get ID of clicked item
          let id = $(e.target).attr('name');

          let id2 = $(e.target).attr('type');

          setFilterSearch(id, id2, e, 'search');
        });
      });

      $(once('search', '#views-exposed-form-01-ocean-lesson-plans-search-block-1', context)).each(function () {
        $('.filter-tab a').on('click', function (e) {
          e.preventDefault();

          // Get ID of clicked item
          let id = $(e.target).attr('id');

          let id2 = $(e.target).attr('type');

          setFilterSearch(id, id2, e, 'educator');
        });
      });
    }
  };

  function setFilterSearch(id, id2, e, which) {
    // Unset and then set the active class
    $('.filter-tab a').removeClass('active');
    $(e.target).addClass('active');

    // Set the new value in the SELECT element
    let filter;
    let filter2;
    let submit;

    if(which === 'search') {
      filter  = $('#views-exposed-form-op-site-search-default select[name="sort_by"]');
      filter2 = $('#views-exposed-form-op-site-search-default select[name="sort_order"]');
      submit  = $('#views-exposed-form-op-site-search-default input.button.js-form-submit');
    } else {
      filter  = $('#views-exposed-form-01-ocean-lesson-plans-search-block-1 select[name="sort_by"]');
      filter2 = $('#views-exposed-form-01-ocean-lesson-plans-search-block-1 select[name="sort_order"]');
      submit  = $('#views-exposed-form-01-ocean-lesson-plans-search-block-1 input.button.js-form-submit');
    }

    $(filter2).trigger('change');
    $(filter2).val(id2);
    $(filter2).trigger('change');

    $(filter).val(id);
    $(filter).change();
    $(filter).trigger('change');

    $(submit).trigger('click');
  }

  function setFilter(id, e) {
    // Set the new value in the SELECT element
    let filter;
    let submit;
    if ($('#views-exposed-form-01-ocean-topics-default').length) {
      filter = $('#views-exposed-form-01-ocean-topics-default select[name="field_op_generated_tags_target_id"]');
      submit = $('#views-exposed-form-01-ocean-topics-default input.button.js-form-submit');
    }

    // Unset and then set the active class
    if ($('.filter-tab a').length > 0) {
      $('.filter-tab a').removeClass('active');
      $(e.target).addClass('active');
    }

    // $(filter).change();
    $(filter).val(id);
    $(filter).trigger('change');
    $(submit).trigger('click');
  }


  $(document).ajaxComplete(function (event, xhr, settings) {
    if (settings.extraData) {
      switch (settings.extraData.view_name) {
        case "01_ocean_topics":
          $('.pager li').removeClass('active');
          $(".pager li a[title='Go to page 1']").parent().addClass('active');

          let filter_id = $('#views-exposed-form-01-ocean-topics-default select[name="field_op_generated_tags_target_id"]').find(":selected").val();

          $('.filter-tab a').removeClass('active');
          $('.filter-tab').find('#' + filter_id).addClass('active');

          $('#views-exposed-form-01-ocean-topics-default .pop-list').remove();

          break;

        case "op_site_search":
          // $('.pager li').removeClass('active');
          // $(".pager li a[title='Go to page 1']").parent().addClass('active');

          break;

        case "01_ocean_lesson_plans_search":
          filter_id = $('#views-exposed-form-01-ocean-lesson-plans-search-block-1 select[name="sort_by"]').find(":selected").val();
          let filter_id2 = $('#views-exposed-form-01-ocean-lesson-plans-search-block-1 select[name="sort_order"]').find(":selected").val();

          $('.filter-tab a').removeClass('active');
          let items = $('.filter-tab').find('#' + filter_id);

          $(items).each(function () {
            // .addClass('active')
            if(filter_id2 === $(this).attr('type')) {
              $(this).addClass('active');
            }
          });

          $('.pager li').removeClass('active');
          $(".pager li a[title='Go to page 1']").parent().addClass('active');

          break;

        default:
          break;
      }
    }
    else {
      $('.pager li').removeClass('active');
      let theTitle = 'Go to page ' + (parseInt(page) + 1);
      $(".pager li a[title='" + theTitle + "']").parent().addClass('active');
    }
  });

})(jQuery, once);