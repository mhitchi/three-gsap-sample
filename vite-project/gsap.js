import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.set('.card', {position: 'absolute'});

gsap.registerPlugin(ScrollTrigger);

gsap.to('.card', {
    yPercent: -50,
    stagger: 0.5,
    scrollTrigger: {
        trigger: '.spacer',
        start: "top 95%",
        end: "top 0%",
        markers: true,
        toggleActions: "restart none none none",
        scrub: 5,
    }
})

gsap.to(".square", {
    x: 700,
    rotate: 360,
    duration: 3,
    scrollTrigger: {
        trigger: ".square",
        start: "top 80%",
        end: "top 30%",
        toggleActions: "restart none none none",
        scrub: 2,
        //              onEnter onLeave onEnterBack onLeaveBack
        markers: true,
        toggleClass: "red"
    }
})


