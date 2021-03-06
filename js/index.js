/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
                            return typeof args[number] != 'undefined'
                            ? args[number]
                            : match
                            ;
                            });
    };
}

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var scroller = "appEl";
        
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');
        
        //myScroll = new iScroll(scroller, { hScroll: true, vScroll: false});

        //$(parentElement).hide();
        
        $(listeningElement).hide();
        $(receivedElement).show();

        console.log('Received Event: ' + id);
        navigator.globalization
                .getLocaleName(
                    function (locale) {
                    	console.log(JSON.stringify(locale));
                    	var language = locale.value.replace(/(\w{2})_(.{2})/, "$1");
                    	
	                    var strings = "res/strings/{0}.json".format(language);
	                    console.log("reading: {0}".format(strings));
	                                  
	                    $.ajax({url: strings, dataType: "json"})
	                      .done(function(json) {
	                            console.log(JSON.stringify(json));
	                            
	                            $("h1").text(json.title);
	                            $(receivedElement).text(json.ready);
	                        })
	                      .error(function(e) {
	                             console.log(JSON.stringify(e));
	                         });
	                      
                        //$(parentElement).slideDown(2000);
                    },
                    function (e) {
                    	console.log(JSON.stringify(e));
                        alert('Error getting language\n');
                    }
                );
    }
};
