/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('URLs are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('names are defined', function() {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });


    /* Test suite for the menu */
    describe('The menu', function() {
        const bodyElement = document.querySelector('body');

        /* Test that ensures the menu element is
         * hidden by default. 
         */
        it('is hidden by default', function() {
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true);
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         it('shows and hides when clicked', function() {
            const menuElement = document.querySelector('.menu-icon-link');

            menuElement.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(false); // showing

            menuElement.click();
            expect(bodyElement.classList.contains('menu-hidden')).toBe(true); // hidden
         });
    });

    /* Test suite for initial entries */
    describe('Initial Entries', function() {
        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test uses
         * Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        
        it('has at least one entry', function(done) {
            const feedElement = document.querySelector('.feed');
            const entryElement = document.querySelector('.entry');

            expect(feedElement.contains(entryElement)).toBe(true);
            done();
        });
    });

    /* Test suite for loading new feeds
     * Credit: New Feed Selection suite is from Matt Cranford's walkthrough
     * Source: https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
     * (I tried my own code first but couldn't get it to work; it's commented out)
     */
    describe('New Feed Selector', function() {
/*         const feedElement = document.querySelector('.feed');
        let originalFeed, newFeed; */
        const feed = document.querySelector('.feed');
        const firstFeed = [];

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Uses done() callback because loadFeed() is asynchronous.
         */
        beforeEach(function(done) {
            loadFeed(0);
            /* originalFeed = feedElement.children;
            done(); */
            Array.from(feed.children).forEach(function(entry) {
                firstFeed.push(entry.innerText);
            });
            loadFeed(1, done);
        });

        it('loads new content', function() {
            Array.from(feed.children).forEach(function(entry, index) {
                console.log(entry.innerText, firstFeed[index], entry.innerText === firstFeed[index]);
                expect(entry.innerText === firstFeed[index]).toBe(false);
            });
/*             loadFeed(1, done);
            newFeed = feedElement.children;
            for (let i = 0; i < originalFeed.length; i++) {
                console.log(originalFeed[i].innerText, newFeed[i].innerText);
                expect(originalFeed[i].innerText === newFeed[i].innerText).toBe(false);
            }
            done(); */
        });
    });
}());
