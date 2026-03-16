/**
 * Trip progress component for the Chicago → Galena EV road trip article.
 * Requires Vue 3 to be loaded globally before this script runs.
 *
 * Each stop's `id` should match a heading ID in the article markup, e.g.:
 *   ## Departing Chicago {#chicago-start}
 */

const { createApp, ref, computed, onMounted, onUnmounted } = Vue;

const STOPS = [
    { label: 'Chicago',  id: 'chicago-start',  day: 1 },
    { label: 'Rockford', id: 'rockford-day1',  day: 1, charging: true },
    { label: 'Galena',   id: 'galena-arrival', day: 1 },
    { label: 'Galena',   id: 'galena-day2',    day: 2 },
    { label: 'Rockford', id: 'rockford-day2',  day: 2, charging: true },
    { label: 'Chicago',  id: 'chicago-return', day: 2 },
];

createApp({
    setup() {
        const currentStop = ref(0);

        function updateCurrentStop() {
            // At the bottom of the page, always activate the last stop
            const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 10;
            if (atBottom) {
                const lastIdx = STOPS.length - 1;
                if (lastIdx !== currentStop.value) {
                    const prev = document.getElementById(STOPS[currentStop.value].id);
                    if (prev) prev.classList.remove('-active-section');
                    const next = document.getElementById(STOPS[lastIdx].id);
                    if (next) next.classList.add('-active-section');
                    currentStop.value = lastIdx;
                }
                return;
            }

            // Trigger when a section heading reaches 40% down the viewport
            const threshold = window.scrollY + window.innerHeight * 0.4;
            let active = 0;
            for (let i = 0; i < STOPS.length; i++) {
                const el = document.getElementById(STOPS[i].id);
                if (el && el.getBoundingClientRect().top + window.scrollY <= threshold) {
                    active = i;
                }
            }

            if (active !== currentStop.value) {
                const prev = document.getElementById(STOPS[currentStop.value].id);
                if (prev) prev.classList.remove('-active-section');
                const next = document.getElementById(STOPS[active].id);
                if (next) next.classList.add('-active-section');
            }

            currentStop.value = active;
        }

        onMounted(() => {
            window.addEventListener('scroll', updateCurrentStop, { passive: true });
            updateCurrentStop();
        });

        onUnmounted(() => {
            window.removeEventListener('scroll', updateCurrentStop);
        });

        const carLeftPercent = computed(() =>
            (currentStop.value / (STOPS.length - 1)) * 100
        );

        function stopLeftPercent(i) {
            return (i / (STOPS.length - 1)) * 100;
        }

        return { STOPS, currentStop, carLeftPercent, stopLeftPercent };
    },

    template: `
    <nav class="trip-progress" aria-label="Trip progress">
      <div class="trip-row">
        <span class="trip-days__label">Day 1</span>
        <div class="trip-track">
        <div class="trip-track__line"></div>
        <div class="trip-track__progress" :style="{ width: carLeftPercent + '%' }"></div>
        <div class="trip-track__divider"></div>
        <img
          class="trip-track__car"
          :style="{ left: carLeftPercent + '%' }"
          src="/post-assets/chi-gal-ev-roadtrip/tesla-model3.png"
          alt=""
          aria-hidden="true"
        />
        <a
          v-for="(stop, i) in STOPS"
          :key="stop.id"
          class="trip-stop"
          :class="{ '-active': i === currentStop, '-visited': i < currentStop, '-charging': stop.charging }"
          :style="{ left: stopLeftPercent(i) + '%' }"
          :href="'#' + stop.id"
          :aria-label="stop.label + (stop.charging ? ' (charging stop)' : '')"
        >
          <img
            class="trip-stop__icon"
            :src="stop.charging
              ? '/post-assets/chi-gal-ev-roadtrip/ev_station.svg'
              : '/post-assets/chi-gal-ev-roadtrip/location_on.svg'"
            alt=""
            aria-hidden="true"
          />
          <div class="trip-stop__dot"></div>
          <span class="trip-stop__label">{{ stop.label }}</span>
        </a>
        </div>
        <span class="trip-days__label">Day 2</span>
      </div>
    </nav>
  `
}).mount('#trip-progress');
