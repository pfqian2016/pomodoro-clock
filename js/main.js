$(document).ready(function(){
  let $breakLength = $(".control .break-ctrl span");
  let $sessionLength = $(".control .session-ctrl span");
  let $time = $(".timer .time");
  let $type = $(".timer .type");
  let breakTime = $breakLength.text();
  let sessionTime = $sessionLength.text();
  let countSession = sessionTime * 60;
  let countBreak = breakTime * 60;
  // $time.text(sessionTime);
  //add time control click listener
  $(".wrapper").click(function(event){
    let target=event.target;
    switch(target.id){
      case "break-minus":
        if(breakTime === 1){
          $("#break-minus").prop("disabled");
          break;
        }else {
          breakTime--;
          $breakLength.text(breakTime);
          countBreak = breakTime * 60;
          break;
        }
      case "break-plus":
        $("#break-minus").removeProp("disabled");
        breakTime++;
        $breakLength.text(breakTime);
        countBreak = breakTime * 60;
        break;
      case "session-minus":
        if(sessionTime === 1){
          $("#session-minus").prop("disabled");
          break;
        }else {
          sessionTime--;
          $sessionLength.text(sessionTime);
          $time.text(sessionTime);
          countSession = sessionTime * 60;
          break;
        }
      case "session-plus":
        $("#session-minus").removeProp("disabled");
        sessionTime++;
        $sessionLength.text(sessionTime);
        $time.text(sessionTime);
        countSession = sessionTime * 60;
        break;
    }
  });

  let counting = false;//whether counting down
  let type = "session";//counting type
  $(".timer").click(function(event){
    let $target = $(event.target);
    if($target.is("p")){
      //TODO start/stop the timer
      var timer = {
        start: function(){
          counting = true;
          $(".control button").attr("disabled","true");
          interval_id = setInterval(function(){
            countDown(type);
          },1000);
        },
        stop: function(){
          counting = false;
          $(".control button").removeAttr("disabled");
          clearInterval(interval_id);
        }
      };
      if(!counting){
        timer.start();
      }else {
        timer.stop();
      }
    }
  });
  function countDown(t){
    //TODO count down,when time === 0,toggle
    if(t === "session"){
      //TODO count down session time
      if(countSession > 0){
        countSession--;
        let minute = Math.floor(countSession/60);
        let second = Math.floor(countSession%60);
        if(second < 10){
          second = "0" + second;
        }
        $type.text("SESSION");
        $time.text(minute + ":" + second);
        let fillHeight = (1-countSession/sessionTime/60) * 100 + "%";
        let fillColor = "#03bb7a";
        $(".fill").css({
          height : fillHeight,
          background : fillColor
        });
      }else {
        //TODO reset session time and setup break time
        countSession = sessionTime * 60;
        type = "break";
        $(".fill").css({
          height: 0,
          background: "transparent"
        });
        let minute = Math.floor(countBreak/60);
        let second = Math.floor(countBreak%60);
        if(second < 10){
          second = "0" + second;
        }
        $type.text("BREAK");
        $time.text(minute + ":" + second);
      }
    }else if (t === "break"){
      //TODO count down break time
      if(countBreak > 0){
        countBreak--;
        let minute = Math.floor(countBreak/60);
        let second = Math.floor(countBreak%60);
        if(second < 10){
          second = "0" + second;
        }
        $type.text("BREAK");
        $time.text(minute + ":" + second);
        let fillHeight = (1-countBreak/breakTime/60) * 100 + "%";
        let fillColor = "#ea4545";
        $(".fill").css({
          height : fillHeight,
          background : fillColor
        });
      }else {
        //TODO reset break time and setup session time
        countBreak = breakTime * 60;
        type = "session";
        $(".fill").css({
          height: 0,
          background: "transparent"
        });
        let minute = Math.floor(countSession/60);
        let second = Math.floor(countSession%60);
        if(second < 10){
          second = "0" + second;
        }
        $type.text("SESSION");
        $time.text(minute + ":" + second);
      }
    }
  }
});
