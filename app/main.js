/**
 * Created by ania on 11/11/16.
 */

(function(){
    var app = angular.module('MainController', ['ngAnimate']);

    app.controller('formController', function ($scope) {
        $scope.equasion = "y = ax + b";
        $scope.monotonicity = "Monotonicity of";
        $scope.point0 = "-b/a";

        /* -- dzięki items.push('1') przy ng-click zmnienia się długość tablicy items,
        *to z kolei powoduje zmianę widoczną dla watcha w animacji i wymusza zmianę tła równania
        * przy każdym kliku -- */
        $scope.items = [];


        /*-- tablica do stworzenia szeregu wartości y, aby móc narysować wykres --*/
        $scope.arrayForChart = [1,2,3,4,5,8];


        /* -- wykres, dane na wejściu -- */
        //$scope.chartOptions = {
        //    legend: {
        //        enabled: false
        //    },
        //    title: {
        //        text: 'Linear equasion graphic solution'
        //    },
        //    xAxis: {
        //        title: {
        //            text: 'X'
        //        }
        //    },
        //
        //    yAxis: {
        //        title: {
        //            text: 'Y'
        //        }
        //    },
        //
        //    series: [{
        //        data: [1,2,3,4,5]
        //    }]
        //};


        $scope.update = function(value) {

            /* -- input blank, first two clicks on "calculate" -- */
            if (((value.a && value.b) === '') || ((value.a && value.b) === undefined)) {
                $scope.unfilled = "Fill both fields with numbers";
                $scope.equasion = "y = ax + b";
            }

            /* -- input filled with numbers -- */
            else {
                $scope.unfilled = "";

                if (value.b < 0) {
                    $scope.equasion = "y = " + value.a + "x - " + (-value.b);
                }

                else {
                    $scope.equasion = "y = " + value.a + "x + " + value.b;
                }

                /* -- Description of the function: monotonicity => value.a -- */
                if (value.a > 0) {
                    $scope.monotonicity = "Increasing";
                }

                else if (value.a < 0) {
                    $scope.monotonicity = "Decreasing";
                }

                else {
                    $scope.monotonicity = "Constant";
                }

                /* -- Description of the function: zero of function => value.b -- */
                $scope.point0 = (-value.b)/value.a;

            }


        };

        $scope.reset = function() {
            $scope.equasion = "y = ax + b";
            $scope.value = {
                'a'     : '',
                'b'      : ''
            };
            $scope.unfilled = "";
            $scope.monotonicity = "Monotonicity of";
            $scope.point0 = "-b/a";
            //$scope.required = false;

            /* takes away the red border and notes for inputs */
            $scope.form.$setUntouched();

        };


    });

    /* -- responsivness: animate in click "submit" button -- */
    app.directive('animateOnChange', ['$animate', '$timeout', function($animate, $timeout) {
        return function(scope, elem, attr) {
            scope.$watchCollection(attr.animateOnChange, function() {
                $animate.addClass(elem, 'on').then(function() {
                    $timeout(function(){
                        $animate.removeClass(elem, 'on');
                    }, 0);
                });
            });
        };
    }]);


    // Directive for generic chart, pass in chart options
    //app.directive('hcChart', function () {
    //    return {
    //        restrict: 'E',
    //        template: '<div></div>',
    //        scope: {
    //            options: '='
    //        },
    //        link: function (scope, element) {
    //            Highcharts.chart(element[0], scope.options);
    //        }
    //    };
    //});




})();