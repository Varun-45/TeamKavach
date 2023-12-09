import React from 'react'
import { ChakraProvider, Box, Text, Heading } from '@chakra-ui/react';

import $ from 'jquery'
import './Breathing.css'
var myInterval;
var minutes = 0;
var active = false;
var timer = 0;
var rounds = 0;

function timeToRelax() {
    if (active) {
        rounds++;
        $("#rounds").html("Set " + rounds);
        $("#breath").html("Breath In Deeply");
        $(".relax").addClass("breathIn");
        setTimeout(function () {
            if (active) {
                $("#breath").html("Hold");
            }
        }, 5000);
        setTimeout(function () {
            if (active) {
                $("#breath").html("Breath Out Fully");
                $(".relax").removeClass("breathIn");
                setTimeout(function () {
                    if (active) {
                        $("#breath").html("Hold empty breath");
                    }
                }, 5000);
                setTimeout(function () {
                    timeToRelax();
                }, 10000);
            }
        }, 10000);
    }
}

function updateClock() {
    timer++;
    if (timer % 60 == 0) {
        timer = 0;
        minutes++;
    }
    if (minutes < 9 && timer < 10) {
        $("#timer").html("0" + minutes + ":" + "0" + timer);
    } else if (minutes < 9) {
        $("#timer").html("0" + minutes + ":" + timer);
    } else {
        $("#timer").html(minutes + ":" + timer);
    }
}

//Called when ending sesion, clears the interval, time, count, and changes button class and text
function endSession() {
    clearInterval(myInterval);
    timer = 0;
    minutes = 0;
    rounds = 0;
    $("#timer").html(timer);
    active = false;
    $("#rounds").html(rounds);
    $("#start").addClass("btn-info");
    $("#start").removeClass("btn-warning");
    $("#start").text("Begin Session");
    $("#breath").html("");
    $(".relax").removeClass("breathIn");
}

//Starts breathing session by changing button class, text, starting interval for timer, and calling relax function
function startSession() {
    active = true;
    $("#start").removeClass("btn-info");
    $("#start").addClass("btn-warning");
    $("#start").text("Stop Session");
    myInterval = setInterval(function () {
        updateClock();
    }, 1000);
    timeToRelax();
}

//Called whenever button is clicked, checks if the session is running or not
function checkStatus() {
    if (!active) {
        startSession();
    } else {
        endSession();
    }
}

function scrollme() {
    $('html, body').animate({
        scrollTop: ($("#breathImg").offset().top)
    }, 1000);
}



$(document).ready(function () {
    $("#start").click(function () {
        checkStatus();
    });
    //This scrolls the window to the breathImg element
    $("#snapTo").on("click", function () {
        scrollme();
    });
    /**/

});
const Breathing = () => {
    timeToRelax()
    return (
        <div class="container">

            <h1 id="title">Boxed Breathing


            </h1>
            Boxed breathing, a structured and rhythmic breath control exercise, proves to be a valuable ally in stress management. By inhaling, holding the breath, exhaling, and pausing in equal intervals, this technique activates the body's relaxation response, effectively calming the nervous system. Beyond its physiological benefits, boxed breathing serves as a mindfulness anchor, bringing individuals into the present moment and allowing a temporary detachment from stressors. The deliberate and controlled nature of each breath cycle aids in regulating breathing patterns, reducing anxiety and tension, and promoting mental clarity. Quick and discreet, boxed breathing offers an accessible tool for immediate stress relief, making it a valuable practice for cultivating a sense of calm and composure amid life's challenges. Regular incorporation of this technique into daily routines can contribute to long-term stress resilience and enhanced overall well-being.
            <span class="controls" id="timer">00:00</span>
            <span class="controls" id="rounds">Sets</span>
            <div class="relax">
                <p id="breath"></p>
            </div>
            <div >
                <button id="start" class="btn btn-info" style={{ position: "absolute", left: "46%", top: "120px" }}>Begin Session</button>
            </div>
        </div>

    )
}

export default Breathing