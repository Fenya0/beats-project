let player;
const playerContainer = $(".player");

$(".player__start").click(e => {
  e.preventDefault();

  if (playerContainer.hasClass("paused")) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

$(".player__playback").click(e => {
  e.preventDefault();

  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPosition = (clickedPosition / bar.width()) * 100;
  const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPosition;

  $(".player__playback-button").css({
    left: `${newButtonPosition}%`
  });
  
  player.seekTo(newPlaybackPositionSec);
});




$(".player__volume-slider").click(e => {
  e.preventDefault();

  const bar = $(e.currentTarget);
  const clickedPosition = e.originalEvent.layerX;
  const newButtonPosition = (clickedPosition / bar.width()) * 100;
  const newVolume = newButtonPosition;

  $(".player__volume-slider__button").css({
    left: `${newButtonPosition}%`
  });

  console.log(clickedPosition);
  
  player.setVolume(newVolume);
});




$(".player__splash").click(e =>{
  player.playVideo();
});

const onPlayerReady = () => {
  let interval;
  const durationSec = player.getDuration();

  if (typeof interval != 'undefined') {
    clearInterval(interval);
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSec) * 100;
    const currentVolume = player.getVolume();

    $(".player__playback-button").css({
      left: `${completedPercent}%`
    });

    $(".playback__done").css({
      width: `${completedPercent}%`
    });

    $(".player__volume-slider__button").css({
      left: `${currentVolume}%`
    });

    $(".current-volume").css({
      width: `${currentVolume}%`
    });
  }, 300);
}

const onPlayerStateChange = event => {
 /*  DATA состояния:
 -1 – воспроизведение видео не началось
  0 – воспроизведение видео завершено
  1 – воспроизведение
  2 – пауза
  3 – буферизация
  5 – видео находится в очереди */
  switch (event.data) {
    case 1:
      playerContainer.addClass("active");
      playerContainer.addClass("paused");
      break;
      case 2:
      playerContainer.removeClass("active");
      playerContainer.removeClass("paused");
      break;
  }
};

function onYouTubeIframeAPIReady() {
  player = new YT.Player("yt-player", {
    height: "400",
    width: "660",
    videoId: "S_dfq9rFWAE",
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}