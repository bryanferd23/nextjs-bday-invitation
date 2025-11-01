'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [galleryIndex, setGalleryIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guests: '1',
    message: '',
  });

  const galleryImages = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCZUSRKhzN4VjYDK7z5YchLuJ4PSNS0UScvfXI8pEWghUk-bwt6fZLZNJtyafumzfT1jmy8xVWDWiIKIj_hAFch6tulyvJdwQi8ILh8buP-FEvAH1xhK1ccu2mhMkMiSd-XoqnhTgrY2YvAXEX40gHG0QSDuPARhqfPz7Gs1c1ZgkrpU-qLM6S3gq06lPhsDvgsJLBEP5RKbXH_PSbp2LdQ2z71tA7Y98CNRN9rHtvciywbKRQHc2vwSGgY33L4NR-jAo89dGTROyRe",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDPmqNIXrcV0z4EGbBP70L5s5XxwvZFKizxJVEXtvR2b63nH3hEAgo-U1BoSria8r0G6p2-RNzRF9_LakXmZQLJzc69DOFhQ4YMesmrXghB7gLd3sybBEMjOPrCILHbNV9G-NR0rUaoWtfLqEC9E-HbiZScHuBGMaq1EYh_Cawwx8-wsAvi7MViSUlBX5ovvJMnvSO0OvbCArDrPHLklkorPM4a6O9JVqfbWaOBJHf3zXCiFHhyYomuG-lAkhknX6uUSrVwXj9ePfnc",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuA0b4nMTL65QMMdd66O1iQYO3Wxj_okbHqOnkt0nenVbE44uQ8S1_1bn0u2ommCu75Kbv0AEJySNtfzAyQNgUsRal6IE6JPuMgKjg2csiVsDebTpxx2H2SPD2mfti6fg9fs48sFiV5AU9YIDEPv7ufdItI4cfJk-6mXALi1J_5Dsb2UsGW8i6oIH4OprVSVobVdsKMthKdkXucGZRq8LT0YFLnt9difNUTDhFAUwriY1Ij0XIiavD1NZ3M6_kcNc6GrRaTPbZxs6l0v",
  ];

  useEffect(() => {
    const eventDate = new Date('2026-11-18T19:00:00').getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = eventDate - now;

      if (distance < 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setGalleryIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = e.currentTarget;
    const name = (formData.elements.namedItem('name') as HTMLInputElement).value;
    const email = (formData.elements.namedItem('email') as HTMLInputElement).value;
    const attendance = (formData.elements.namedItem('attendance') as HTMLInputElement).value;
    const guests = (formData.elements.namedItem('guests') as HTMLSelectElement).value;
    const message = (formData.elements.namedItem('message') as HTMLTextAreaElement).value;

    if (!name || !email || !attendance) {
      alert('Please fill in all required fields (Name, Email, and Attendance).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    alert('Thank you for your RSVP! We are thrilled that you will be joining us to celebrate Anna\'s special day. Your response has been recorded and we look forward to seeing you on November 18th, 2026!');
    e.currentTarget.reset();
  };

  const handleAddToCalendar = () => {
    const startDate = '20261118T190000';
    const endDate = '20261118T230000';
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Anna's Birthday Party&dates=${startDate}/${endDate}&details=Join us for a night of fun, laughter, and making memories at The Rainbow Room&location=30%20Rockefeller%20Plaza%2C%20New%20York%2C%20NY%2010112`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="relative w-full">
      <header className="sticky top-0 z-50 w-full border-b border-neutral-light/50 bg-background-light/80 backdrop-blur-sm dark:border-neutral-dark/50 dark:bg-background-dark/80">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 md:px-6">
          <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
            <span className="material-symbols-outlined text-primary"> celebration </span>
            <h2 className="text-lg font-bold">Anna's Birthday Bash</h2>
          </div>
          <nav className="hidden items-center gap-9 md:flex">
            <a className="text-sm font-medium hover:text-primary" href="#details">Details</a>
            <a className="text-sm font-medium hover:text-primary" href="#gallery">Gallery</a>
            <a className="text-sm font-medium hover:text-primary" href="#rsvp">RSVP</a>
          </nav>
          <a
            className="hidden md:flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-9 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-wide hover:opacity-90"
            href="#rsvp"
          >
            <span>RSVP Now</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 md:px-6">
        <section className="w-full" id="hero">
          <div
            className="flex min-h-[60vh] flex-col gap-8 rounded-xl bg-cover bg-center bg-no-repeat p-8 text-center items-center justify-center"
            style={{
              backgroundImage: `linear-gradient(rgba(10, 25, 47, 0.6) 0%, rgba(10, 25, 47, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuAFBFhwXfF8AaoRG9_G8h4P2ipQQMVhYHGPOP9X4n5Uv4uHoucXhXVDtPkoKt_vyVngCy_i_ioxnC8kN9M1XidCnWJ9vfyirT7Yh1jBTlov5zD091HE1GMDU3JQRXhlH_1MvdSPoLvF44EhSKjB_-4tSJppO3TWCwDXYxcoS4IYe0j1NpalA4wXGbCNT4mXD-J1aXN28pFnhe0dSq3Ub1s0Hmyh35a4-1RRurzU8BwNPuzheG6JMdQSEbPekCNoXmue33VgEYJtDY4R")`,
            }}
          >
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl font-black text-white md:text-6xl">
                You're Invited to Celebrate Anna's Birthday!
              </h1>
              <h2 className="text-base font-normal text-neutral-light md:text-lg">
                Join us for a night of fun, laughter, and making memories.
              </h2>
            </div>

            <div className="w-full max-w-md">
              <div className="grid grid-cols-4 gap-2 md:gap-4">
                <div className="flex flex-col items-stretch gap-2">
                  <div className="flex h-16 grow items-center justify-center rounded-lg bg-white/10 px-3 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">{timeLeft.days}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-normal text-neutral-light">Days</p>
                  </div>
                </div>
                <div className="flex flex-col items-stretch gap-2">
                  <div className="flex h-16 grow items-center justify-center rounded-lg bg-white/10 px-3 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">{timeLeft.hours}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-normal text-neutral-light">Hours</p>
                  </div>
                </div>
                <div className="flex flex-col items-stretch gap-2">
                  <div className="flex h-16 grow items-center justify-center rounded-lg bg-white/10 px-3 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">{timeLeft.minutes}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-normal text-neutral-light">Minutes</p>
                  </div>
                </div>
                <div className="flex flex-col items-stretch gap-2">
                  <div className="flex h-16 grow items-center justify-center rounded-lg bg-white/10 px-3 backdrop-blur-sm">
                    <p className="text-3xl font-bold text-white">{timeLeft.seconds}</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-sm font-normal text-neutral-light">Seconds</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-6 bg-primary text-white text-base font-bold tracking-wide hover:opacity-90"
              href="#rsvp"
            >
              <span className="truncate">RSVP Now</span>
            </a>
          </div>
        </section>

        <section className="py-16" id="details">
          <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark text-center">
            Event Details
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4">
                <div className="flex items-start gap-4 border-t border-neutral-light pt-4 dark:border-neutral-dark">
                  <span className="material-symbols-outlined mt-1 text-primary">calendar_month</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Date</p>
                    <p className="text-base font-normal">Saturday, November 18, 2026</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-t border-neutral-light pt-4 dark:border-neutral-dark">
                  <span className="material-symbols-outlined mt-1 text-primary">schedule</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Time</p>
                    <p className="text-base font-normal">7:00 PM - 11:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-t border-neutral-light pt-4 dark:border-neutral-dark sm:col-span-2">
                  <span className="material-symbols-outlined mt-1 text-primary">location_on</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Location</p>
                    <p className="text-base font-normal">The Rainbow Room, 30 Rockefeller Plaza, New York, NY 10112</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-t border-neutral-light pt-4 dark:border-neutral-dark">
                  <span className="material-symbols-outlined mt-1 text-primary">styler</span>
                  <div>
                    <p className="text-sm font-medium text-primary">Dress Code</p>
                    <p className="text-base font-normal">Cocktail Attire</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleAddToCalendar}
                className="mt-4 flex w-full max-w-xs cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full h-11 px-5 bg-primary/20 text-primary text-sm font-bold hover:bg-primary/30"
              >
                <span className="material-symbols-outlined text-base">download</span>
                <span className="truncate">Add to Calendar</span>
              </button>
            </div>
            <div className="h-64 min-h-[250px] w-full overflow-hidden rounded-xl md:h-full">
              <iframe
                src="https://maps.google.com/maps?q=30+Rockefeller+Plaza,+New+York,+NY+10112&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-xl"
              />
            </div>
          </div>
        </section>

        <section className="py-16" id="gallery">
          <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark text-center">
            Gallery
          </h2>
          <p className="mt-2 text-center text-text-light/80 dark:text-text-dark/80">A few moments to remember</p>
          <div className="mt-8">
            <div className="relative max-w-4xl mx-auto">
              <div className="relative h-[400px] md:h-[500px] overflow-hidden rounded-xl">
                <img
                  src={galleryImages[galleryIndex]}
                  alt={`Gallery image ${galleryIndex + 1}`}
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background-light/90 shadow-lg hover:bg-neutral-light dark:bg-background-dark/90 dark:hover:bg-neutral-dark transition-colors"
                  aria-label="Previous image"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_left</span>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-background-light/90 shadow-lg hover:bg-neutral-light dark:bg-background-dark/90 dark:hover:bg-neutral-dark transition-colors"
                  aria-label="Next image"
                >
                  <span className="material-symbols-outlined text-2xl">chevron_right</span>
                </button>
              </div>
              <div className="mt-6 flex justify-center gap-3">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setGalleryIndex(index)}
                    className={`h-3 w-12 rounded-full transition-all ${
                      index === galleryIndex ? 'bg-primary' : 'bg-neutral-light dark:bg-neutral-dark hover:bg-primary/50'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            <div className="mt-8 grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              {galleryImages.map((src, index) => (
                <button
                  key={index}
                  onClick={() => setGalleryIndex(index)}
                  className={`aspect-square overflow-hidden rounded-lg transition-all ${
                    index === galleryIndex ? 'ring-4 ring-primary ring-offset-2' : 'hover:scale-105'
                  }`}
                  aria-label={`Select image ${index + 1}`}
                >
                  <img
                    className="h-full w-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                    src={src}
                  />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16" id="rsvp">
          <div className="mx-auto max-w-2xl rounded-xl bg-background-light p-8 shadow-lg ring-1 ring-neutral-light/50 dark:bg-neutral-dark/20 dark:ring-neutral-dark/50">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight text-text-light dark:text-text-dark">
                Will You Be Joining Us?
              </h2>
              <p className="mt-2 text-text-light/80 dark:text-text-dark/80">Please let us know by November 10th.</p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium" htmlFor="name">
                    Full Name <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    aria-required="true"
                    className="mt-1 block w-full rounded-md border-neutral-light bg-neutral-light/50 dark:border-neutral-dark dark:bg-neutral-dark/50 focus:border-primary focus:ring-primary px-3 py-2"
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium" htmlFor="email">
                    Email Address <span className="text-red-500" aria-label="required">*</span>
                  </label>
                  <input
                    name="email"
                    required
                    aria-required="true"
                    className="mt-1 block w-full rounded-md border-neutral-light bg-neutral-light/50 dark:border-neutral-dark dark:bg-neutral-dark/50 focus:border-primary focus:ring-primary px-3 py-2"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">
                  Attendance <span className="text-red-500" aria-label="required">*</span>
                </label>
                <div className="mt-2 flex gap-4">
                  <label className="inline-flex items-center">
                    <input
                      name="attendance"
                      type="radio"
                      value="attending"
                      required
                      aria-required="true"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2">Joyfully Attending</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      name="attendance"
                      type="radio"
                      value="declining"
                      className="text-primary focus:ring-primary"
                    />
                    <span className="ml-2">Regretfully Declining</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="guests">
                  Number of Guests
                </label>
                <select
                  name="guests"
                  className="mt-1 block w-full rounded-md border-neutral-light bg-neutral-light/50 dark:border-neutral-dark dark:bg-neutral-dark/50 focus:border-primary focus:ring-primary px-3 py-2"
                  id="guests"
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="message">
                  Dietary Restrictions or Message
                </label>
                <textarea
                  name="message"
                  className="mt-1 block w-full rounded-md border-neutral-light bg-neutral-light/50 dark:border-neutral-dark dark:bg-neutral-dark/50 focus:border-primary focus:ring-primary px-3 py-2"
                  id="message"
                  rows={3}
                  placeholder="Please let us know about any dietary restrictions or special requests"
                />
              </div>
              <div>
                <button
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-bold text-white bg-primary hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  type="submit"
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-light dark:border-neutral-dark">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-text-light/70 dark:text-text-dark/70">Can't wait to celebrate with you!</p>
            <div className="flex items-center gap-4">
              <p className="text-sm font-medium">Share the joy:</p>
              <div className="flex gap-2">
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-light dark:hover:bg-neutral-dark"
                  href="#"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      clipRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      fillRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-light dark:hover:bg-neutral-dark"
                  href="#"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-neutral-light dark:hover:bg-neutral-dark"
                  href="#"
                >
                  <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.012 2.251A9.75 9.75 0 002.25 12.012c0 5.385 4.365 9.75 9.75 9.75s9.75-4.365 9.75-9.75S17.397 2.25 12.012 2.25zm-.15 4.312c.38-.002.75.127 1.05.38.3.253.51.594.618 1.002.106.408.087.84-.055 1.238-.143.4-.383.74-.7.994s-.703.424-1.114.462c-.41.037-.822-.05-1.185-.245-.363-.195-.66-.49-.855-.855-.195-.363-.282-.775-.245-1.185.037-.41.168-.81.462-1.114.293-.304.633-.544.994-.7a2.12 2.12 0 011.05-.38zM8.34 9.128a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0zm1.758 8.625c.31.31.722.464 1.135.464h.025c.412 0 .824-.154 1.135-.464.31-.31.464-.722.464-1.135v-4.5c0-.413-.154-.825-.464-1.135a1.603 1.603 0 00-1.135-.464h-.025a1.603 1.603 0 00-1.135.464c-.31.31-.464.722-.464 1.135v4.5c0 .413.154.825.464 1.135zM15.66 9.128a1.125 1.125 0 10-2.25 0 1.125 1.125 0 002.25 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
