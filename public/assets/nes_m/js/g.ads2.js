var adsManager;
var adsLoader;
var adDisplayContainer;
var intervalTimer;
var videoContent;

function init() {
  createAdElement();
  videoContent = document.body;
  setUpIMA();
}
function createAdElement(){
	 var r = document.createElement("div");
	  r.setAttribute("id", "adshow");
      r.style = "position: absolute;z-index:-1";
	  var tvhr = document.getElementById('tvhr');
	  
	  tvhr.appendChild(r);
}
function setUpIMA() {
  // Create the ad display container.
  createAdDisplayContainer();
  // Create ads loader.
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
  // Listen and respond to ads loaded and error events.
  adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded,
      false);
  adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false);

  // An event listener to tell the SDK that our content video
  // is completed so the SDK can play any post-roll ads.
  var contentEndedListener = function() {adsLoader.contentComplete();};
  //videoContent.onended = contentEndedListener;

  // Request video ads.
  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl = 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_image&client=ca-games-pub-2537602355535235&description_url=https%3A%2F%2Fwww%2Fyikm.net&videoad_start_delay=0&hl=zh_CN&max_ad_duration=30000';

  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = $('.tv-hr').width();
  adsRequest.linearAdSlotHeight = $('.tv-hr').height();

  adsRequest.nonLinearAdSlotWidth = $('.tv-hr').width();
  adsRequest.nonLinearAdSlotHeight = $('.tv-hr').height();

  adsLoader.requestAds(adsRequest);
}


function createAdDisplayContainer() {
  // We assume the adContainer is the DOM id of the element that will house
  // the ads.
  adDisplayContainer = new google.ima.AdDisplayContainer(
      document.getElementById('adshow'), videoContent);
}

function playAds() {
  // Initialize the container. Must be done via a user action on mobile devices.
  //videoContent.load();
  adDisplayContainer.initialize();

  try {
	  var bodye = document.body;
    // Initialize the ads manager. Ad rules playlist will start at this time.
    adsManager.init($('.tv-hr').width(), $('.tv-hr').height(), google.ima.ViewMode.NORMAL);
    // Call play to start showing the ad. Single video and overlay ads will
    // start at this time; the call will be ignored for ad rules.
    adsManager.start();
  } catch (adError) {
    // An error may be thrown if there was a problem with the VAST response.
    //videoContent.play();
  }
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Get the ads manager.
  var adsRenderingSettings = new google.ima.AdsRenderingSettings();
  adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
  // videoContent should be set to the content video element.
  adsManager = adsManagerLoadedEvent.getAdsManager(
      videoContent, adsRenderingSettings);

  // Add listeners to the required events.
  adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      onAdEvent);

  // Listen to any additional events, if necessary.
  adsManager.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      onAdEvent);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      onAdEvent);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.COMPLETE,
      onAdEvent);
adsManager.addEventListener(
      google.ima.AdEvent.Type.SKIPPED,
      onAdEvent);
adsManager.addEventListener(
      google.ima.AdEvent.Type.USER_CLOSE,
      onAdEvent);

  playAds();
}

function onAdEvent(adEvent) {
  // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
  // don't have ad object associated.
  var ad = adEvent.getAd();
  switch (adEvent.type) {
    case google.ima.AdEvent.Type.LOADED:
      // This is the first event sent for an ad - it is possible to
      // determine whether the ad is a video ad or an overlay.
      if (!ad.isLinear()) {
        // Position AdDisplayContainer correctly for overlay.
        // Use ad.width and ad.height.
        //videoContent.play();
      }
	  $("#adshow").css({"z-index":999999});
      break;
    case google.ima.AdEvent.Type.STARTED:
      // This event indicates the ad has started - the video player
      // can adjust the UI, for example display a pause button and
      // remaining time.
      if (ad.isLinear()) {
        // For a linear ad, a timer can be started to poll for
        // the remaining time.
        intervalTimer = setInterval(
            function() {
              var remainingTime = adsManager.getRemainingTime();
            },
            300); // every 300ms
      }
      break;
    case google.ima.AdEvent.Type.COMPLETE:
	case google.ima.AdEvent.Type.ALL_ADS_COMPLETED:
	case google.ima.AdEvent.Type.SKIPPED:
	case google.ima.AdEvent.Type.USER_CLOSE:
      // This event indicates the ad has finished - the video player
      // can perform appropriate UI actions, such as removing the timer for
      // remaining time detection.
	  $("#adshow").css({"z-index":-1});
      if (ad.isLinear()) {
        clearInterval(intervalTimer);
		
      }
      break;
  }
}

function onAdError(adErrorEvent) {
  // Handle the error logging.
  console.log(adErrorEvent.getError());
  adsManager.destroy();
  $("#adshow").css({"z-index":-1});
}

function onContentPauseRequested() {
  //videoContent.pause();
  // This function is where you should setup UI for showing ads (e.g.
  // display ad timer countdown, disable seeking etc.)
  // setupUIForAds();
}

function onContentResumeRequested() {
  //videoContent.play();
  // This function is where you should ensure that your UI is ready
  // to play content. It is the responsibility of the Publisher to
  // implement this function when necessary.
  // setupUIForContent();

}

// Wire UI element references and UI event listeners.
init();