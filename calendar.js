// Hacker-themed Calendar for Snake Chaos House
// Using Vanilla Calendar Pro with custom styling

class HackerCalendar {
  constructor() {
    this.eventDate = '2025-09-15'; // September 15th event
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.createCalendar());
    } else {
      this.createCalendar();
    }
  }

  createCalendar() {
    // Create calendar HTML structure
    this.createCalendarHTML();
    
    // Initialize the calendar with custom configuration
    this.initVanillaCalendar();
    
    // Add event listeners
    this.addEventListeners();
  }

  createCalendarHTML() {
    const calendarSection = document.createElement('section');
    calendarSection.className = 'calendar-section section';
    calendarSection.id = 'calendar';
    calendarSection.setAttribute('aria-label', 'Event Calendar');

    calendarSection.innerHTML = `
      <div class="container calendar-container">
        <h2 class="calendar-title glitch-calendar" data-text="Event Calendar">Event Calendar</h2>
        <p class="calendar-subtitle">
          > Upcoming events and workshops
          <br>
          > <span class="event-highlight">September 15th</span> - Special Event
        </p>
        
        <div id="hacker-calendar"></div>
        
        <div class="event-info reveal">
          <h3>🎯 September 15th Special Event</h3>
          <p>Join us for an exclusive Snake Chaos House event featuring workshops, networking, and hands-on activities.</p>
          
          <div class="event-details">
            <div class="event-detail">
              <span class="icon">📅</span>
              <span>Date: September 15, 2025</span>
            </div>
            <div class="event-detail">
              <span class="icon">⏰</span>
              <span>Time: 6:00 PM - 10:00 PM</span>
            </div>
            <div class="event-detail">
              <span class="icon">📍</span>
              <span>Location: Snake Chaos House HQ</span>
            </div>
            <div class="event-detail">
              <span class="icon">🎫</span>
              <span>Registration: Required</span>
            </div>
          </div>
          
          <div style="margin-top: 1rem;">
            <a href="#membership" class="btn primary">Register Now</a>
          </div>
        </div>
      </div>
    `;

    // Insert after workshops section
    const workshopsSection = document.getElementById('workshops');
    if (workshopsSection) {
      workshopsSection.parentNode.insertBefore(calendarSection, workshopsSection.nextSibling);
    } else {
      // Fallback: insert before footer
      const footer = document.querySelector('.footer');
      if (footer) {
        footer.parentNode.insertBefore(calendarSection, footer);
      }
    }
  }

  initVanillaCalendar() {
    // Check if Vanilla Calendar Pro is loaded
    if (typeof VanillaCalendar === 'undefined') {
      console.warn('Vanilla Calendar Pro not loaded, using fallback calendar');
      this.createFallbackCalendar();
      return;
    }

    const calendar = new VanillaCalendar('#hacker-calendar', {
      // Calendar settings
      type: 'default',
      months: 1,
      jump: 1,
      
      // Date settings
      date: {
        min: '2025-01-01',
        max: '2025-12-31',
        today: new Date(),
      },
      
      // Selected dates
      selected: {
        dates: [this.eventDate],
        month: 8, // September (0-indexed)
        year: 2025,
      },
      
      // Settings
      settings: {
        lang: 'en',
        iso8601: false,
        range: {
          disabled: false,
        },
        selection: {
          day: 'single',
        },
        selected: {
          dates: [this.eventDate],
        },
        visibility: {
          theme: 'dark',
          themeDetect: false,
          monthShort: false,
          weekNumbers: false,
          weekend: true,
          today: true,
          disabled: false,
        },
      },
      
      // Actions
      actions: {
        clickDay: (event, dates) => this.handleDateClick(event, dates),
        clickMonth: (event, month) => this.handleMonthClick(event, month),
        clickYear: (event, year) => this.handleYearClick(event, year),
      },
      
      // Custom date classes
      DOMTemplates: {
        default: `
          <div class="vc-container">
            <div class="vc-header">
              <div class="vc-controls">
                <button type="button" class="vc-arrow vc-arrow_prev" aria-label="Previous month">‹</button>
                <div class="vc-header__content">
                  <button type="button" class="vc-month">{{month}}</button>
                  <button type="button" class="vc-year">{{year}}</button>
                </div>
                <button type="button" class="vc-arrow vc-arrow_next" aria-label="Next month">›</button>
              </div>
            </div>
            <div class="vc-wrapper">
              <div class="vc-content">
                <div class="vc-dates" id="vc-dates">
                  <!-- Dates will be populated here -->
                </div>
              </div>
            </div>
          </div>
        `,
      },
    });

    // Initialize the calendar
    calendar.init();
    
    // Add event date highlighting
    setTimeout(() => this.highlightEventDate(), 100);
  }

  createFallbackCalendar() {
    // Simple fallback calendar if Vanilla Calendar Pro fails to load
    const calendarContainer = document.getElementById('hacker-calendar');
    if (!calendarContainer) return;

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    
    // Create a simple calendar grid
    const calendar = this.generateSimpleCalendar(currentYear, 8); // September (0-indexed)
    calendarContainer.innerHTML = calendar;
  }

  generateSimpleCalendar(year, month) {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start
    
    let html = `
      <div class="vc">
        <div class="vc-controls">
          <button class="vc-arrow vc-arrow_prev">‹</button>
          <div class="vc-header__content">
            <span class="vc-month">${monthNames[month]}</span>
            <span class="vc-year">${year}</span>
          </div>
          <button class="vc-arrow vc-arrow_next">›</button>
        </div>
        <div class="vc-week">
          <div class="vc-week__day">Mon</div>
          <div class="vc-week__day">Tue</div>
          <div class="vc-week__day">Wed</div>
          <div class="vc-week__day">Thu</div>
          <div class="vc-week__day">Fri</div>
          <div class="vc-week__day">Sat</div>
          <div class="vc-week__day">Sun</div>
        </div>
        <div class="vc-dates">
    `;
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < adjustedFirstDay; i++) {
      html += '<div class="vc-date vc-date_other-month"><button class="vc-date__btn"></button></div>';
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isEventDay = day === 15; // September 15th
      const isToday = year === new Date().getFullYear() && 
                     month === new Date().getMonth() && 
                     day === new Date().getDate();
      
      let classes = 'vc-date';
      if (isEventDay) classes += ' vc-date_event';
      if (isToday) classes += ' vc-date_current';
      
      html += `<div class="${classes}"><button class="vc-date__btn">${day}</button></div>`;
    }
    
    html += '</div></div>';
    return html;
  }

  highlightEventDate() {
    // Find and highlight the event date
    const dateButtons = document.querySelectorAll('#hacker-calendar .vc-date__btn');
    dateButtons.forEach(btn => {
      if (btn.textContent === '15') {
        const dateElement = btn.closest('.vc-date');
        if (dateElement) {
          dateElement.classList.add('vc-date_event');
        }
      }
    });
  }

  handleDateClick(event, dates) {
    console.log('Date clicked:', dates);
    
    // Check if the clicked date is the event date
    if (dates.includes(this.eventDate)) {
      this.showEventDetails();
    }
  }

  handleMonthClick(event, month) {
    console.log('Month clicked:', month);
  }

  handleYearClick(event, year) {
    console.log('Year clicked:', year);
  }

  showEventDetails() {
    // Scroll to event info
    const eventInfo = document.querySelector('.event-info');
    if (eventInfo) {
      eventInfo.scrollIntoView({ behavior: 'smooth', block: 'center' });
      
      // Add a temporary highlight effect
      eventInfo.style.boxShadow = '0 0 40px rgba(57,255,20,.6)';
      setTimeout(() => {
        eventInfo.style.boxShadow = '0 0 20px rgba(57,255,20,.3)';
      }, 2000);
    }
  }

  addEventListeners() {
    // Add any additional event listeners here
    document.addEventListener('click', (e) => {
      if (e.target.matches('.vc-date__btn')) {
        const dateText = e.target.textContent;
        if (dateText === '15') {
          this.showEventDetails();
        }
      }
    });
  }
}

// Initialize the hacker calendar when the page loads
document.addEventListener('DOMContentLoaded', () => {
  new HackerCalendar();
});

// Also initialize if the script loads after DOM is ready
if (document.readyState !== 'loading') {
  new HackerCalendar();
}

