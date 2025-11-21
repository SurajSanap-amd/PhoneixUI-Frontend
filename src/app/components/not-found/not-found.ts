import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { gsap } from 'gsap';
import { SplitText } from 'gsap/SplitText';
import $ from 'jquery';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.html',
  styleUrls: ['./not-found.css']
})
export class NotFoundComponent implements AfterViewInit {

  constructor(private router: Router) {}

  ngAfterViewInit(): void {
    // Register GSAP plugin
    gsap.registerPlugin(SplitText);

    const $copyContainer = $('.copy-container');
    const $replayIcon = $('#cb-replay');
    const $copyWidth = $copyContainer.find('p').width() || 0;

    const mySplitText = new SplitText($copyContainer, { type: 'words' });
    const splitTextTimeline = gsap.timeline();
    const handleTL = gsap.timeline();

    // main timeline
    const tl = gsap.timeline({ delay: 0.2 });
    tl.add(() => {
      animateCopy();
      blinkHandle();
    });

    

    function animateCopy() {
      mySplitText.split({ type: 'chars, words' });
      splitTextTimeline.staggerFrom(
        mySplitText.chars,
        0.001,
        {
          autoAlpha: 0,
          ease: 'back.inOut(1.7)',
          onComplete: animateHandle
        },
        0.05
      );
    }

    function blinkHandle() {
      handleTL.fromTo(
        '.handle',
        { autoAlpha: 0 },
        { autoAlpha: 1, repeat: -1, yoyo: true, duration: 0.7 }
      );
    }

  function animateHandle() {
    handleTL.set('.handle', { x: $copyWidth }); // 👈 instantly move to end
    blinkHandle(); // start blinking after positioned
  }

  
    $replayIcon.on('click', () => {
      splitTextTimeline.restart();
      handleTL.restart();
    });

    // ✅ Automatically redirect after 4 seconds
    setTimeout(() => {
      this.router.navigate(['/dashboard']);
    }, 4000);
  }
}
