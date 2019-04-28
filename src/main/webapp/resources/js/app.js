/**
 * Created by Peter on 2/28/2016.
 */
var mapleApp = angular.module('ProjectMaple', []).directive('onFinishRender', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last) {
                return $timeout (function() {
                    var o = $('#maple');
                    var openedClass = 'glyphicon-minus-sign';
                    var closedClass = 'glyphicon-plus-sign';

                    if (typeof o != 'undefined') {
                        if (typeof o.openedClass != 'undefined') {
                            openedClass = o.openedClass;
                        }
                        if (typeof o.closedClass != 'undefined') {
                            closedClass = o.closedClass;
                        }
                    };

                    //initialize each of the top levels
                    var tree = o;
                    tree.addClass("tree");
                    tree.find('li').has("ul").each(function () {
                        var branch = $(this); //li with children ul
                        branch.prepend("<i class='indicator glyphicon " + closedClass + "'></i>");
                        branch.addClass('branch');
                        branch.on('click', function (e) {
                            if (this == e.target) {
                                var icon = $(this).children('i:first');
                                icon.toggleClass(openedClass + " " + closedClass);
                                $(this).children().children().toggle();
                            }
                        });
                        branch.children().children().toggle();
                    });
                    //fire event from the dynamically added icon
                    tree.find('.branch .indicator').each(function () {
                        $(this).on('click', function () {
                            $(this).closest('li').click();
                        });
                    });
                    //fire event to open branch if the li contains an anchor instead of text
                    tree.find('.branch>a').each(function () {
                        $(this).on('click', function (e) {
                            $(this).closest('li').click();
                            e.preventDefault();
                        });
                    });
                    //fire event to open branch if the li contains a button instead of text
                    tree.find('.branch>button').each(function () {
                        $(this).on('click', function (e) {
                            $(this).closest('li').click();
                            e.preventDefault();
                        });
                    });
                $('#tree-top').children().children().toggle();
                });
            }
        }
    }});

//Initialization of treeviews


