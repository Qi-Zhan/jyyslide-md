/**
 * A plugin which enables rendering of a count down clock in
 * reveal.js slides.
 *
 * @author Christer Eriksson
 * original code from <https://github.com/christer79/reveal_countdown/blob/master/countdown.js>
 */
var RevealCountDown =
    window.RevealCountDown ||
    (function () {
        var options = Reveal.getConfig().countdown || {};

        var defaultOptions = {
            defaultTime: 300,
            autostart: "yes",
            tDelta: 30,
            playTickSoundLast: 10,
            tickSound: "",
            timeIsUpSound: "",
            size: "5",
        };

        defaults(options, defaultOptions);

        function defaults(options, defaultOptions) {
            for (var i in defaultOptions) {
                if (!options.hasOwnProperty(i)) {
                    options[i] = defaultOptions[i];
                }
            }
        }

        var tick = options.tickSound != "" ? new Audio(options.tickSound) : null;
        var endSound =
            options.timeIsUpSound != "" ? new Audio(options.timeIsUpSound) : null;
        var counterRef = null;
        var interval = null;
        var startTime = 0;
        var elapsedTime = 0;
        var running = false;

        Reveal.addEventListener("slidechanged", function (event) {
            initCountDown(event.currentSlide);
        });

        // If timer is on first slide start on ready
        Reveal.addEventListener("ready", function (event) {
            initCountDown(event.currentSlide);
        });

        Reveal.addKeyBinding(
            { keyCode: 84, key: "T", description: "Pause/Unpause timer" },
            function () {
                togglePauseTimer();
            }
        );

        Reveal.addKeyBinding(
            { keyCode: 82, key: "R", description: "Reset timer" },
            function () {
                elapsedTime = 0;
                updateTimer(startTime - elapsedTime);
            }
        );

        Reveal.addKeyBinding(
            {
                keyCode: 187,
                key: "+",
                description: "Increase timer with tDelta seconds"
            },
            increaseTime
        );

        Reveal.addKeyBinding(
            {
                keyCode: 189,
                key: "-",
                description: "Decrease time with tDelta seconds"
            },
            decreseTime
        );


        function updateTimer(timeLeft) {
            if (counterRef === null) return;

            let secondsLeft = timeLeft;
            let minutesLeft = Math.floor(secondsLeft / 60);
            secondsLeft = secondsLeft % 60;
            let hoursLeft = Math.floor(minutesLeft / 60);
            minutesLeft = minutesLeft % 60;

            hoursLeft = String(hoursLeft).padStart(2, '0');
            minutesLeft = String(minutesLeft).padStart(2, '0');
            secondsLeft = String(secondsLeft).padStart(2, '0');

            size = options.size;

            let color = timeLeft > 0 ? 'black' : 'red';

            counterRef.innerHTML = `
                <span style="font-size: ${size}em; font-family: 'Comic Sans MS', cursive; color: ${color};">
                    ${hoursLeft} : ${minutesLeft} : ${secondsLeft}
                </span>
            `;
        }

        function increaseTime() {
            startTime = Number(startTime) + Number(options.tDelta);
            updateTimer(startTime - elapsedTime);
        }

        function decreseTime() {
            startTime = Number(startTime) - Number(options.tDelta);
            if (startTime < elapsedTime) startTime = elapsedTime;
            updateTimer(startTime - elapsedTime);
        }

        function togglePauseTimer() {
            running = !running;
        }

        function startTimer() {
            interval = setInterval(async function () {
                if (elapsedTime < startTime && running && !Reveal.isPaused()) {
                    elapsedTime = elapsedTime + 1;
                    updateTimer(startTime - elapsedTime);
                    if (tick && startTime < elapsedTime + options.playTickSoundLast)
                        tick.play();
                    if (endSound && elapsedTime >= startTime) endSound.play();
                }
            }, 1000);
        }

        function initCountDown(currentSlide) {
            if (interval != null) clearInterval(interval);
            counterRef = currentSlide.getElementsByTagName("countdown")[0];
            if (counterRef === undefined) return;
            time = counterRef.getAttribute("time");
            autostart = counterRef.getAttribute("autostart");
            elapsedTime = 0;
            startTime = time ? time : options.defaultTime;
            startTimer();
            updateTimer(startTime - elapsedTime);
            running = autostart === "yes" ? true : false;
        }

        return {
            init: function () { }
        };
    })();

Reveal.registerPlugin("countdown", RevealCountDown);