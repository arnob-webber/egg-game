let nest = $("#nest"),
  container = $("#container"),
  chiken = $(".chiken"),
  eggs = $(".egg"),
  egg1 = $("#egg1"),
  egg2 = $("#egg2"),
  egg3 = $("#egg3"),
  restart = $("#restart"),
  score_span = $("#score"),
  score_1 = $("#score_1"),
  life_span = $("#life"),
  floor = $("#floor"),
  nest_height = nest.height(),
  container_height = container.height(),
  egg_height = eggs.height(),
  egg_initial_position = parseInt(eggs.css("top")),
  score = 0,
  life = 5,
  speed = 2,
  max_speed = 15,
  counter = 0,
  score_updated = false,
  the_game = 0,
  anim_id = 0,
  egg_current_position = 0,
  egg_top = 0,
  nest_top = container_height - nest_height,
  bullseye_num = 0;
life_span.text(life);

$(function () {
  the_game = function () {
    if (check_egg_hits_floor(egg1) || check_egg_hits_nest(egg1)) {
      set_egg_to_initial_position(egg1);
    } else {
      egg_down(egg1);
    }

    if (check_egg_hits_floor(egg2) || check_egg_hits_nest(egg2)) {
      set_egg_to_initial_position(egg2);
    } else {
      egg_down(egg2);
    }

    if (check_egg_hits_floor(egg3) || check_egg_hits_nest(egg3)) {
      set_egg_to_initial_position(egg3);
    } else {
      egg_down(egg3);
    }

    if (life > 0) {
      anim_id = requestAnimationFrame(the_game);
    } else {
      stop_the_game();
    }
  };

  anim_id = requestAnimationFrame(the_game);
});

$(document).on("mousemove", function (e) {
  nest.css("left", e.pageX);
});

function egg_down(egg) {
  egg_current_position = parseInt(egg.css("top"));
  egg.css("top", egg_current_position + speed);
}

function check_egg_hits_floor(egg) {
  if (collision(egg, floor)) {
    show_bulls_eye(egg);
    decrement_life();
    return true;
  }
  return false;
}

function set_egg_to_initial_position(egg) {
  egg.css("top", egg_initial_position);
}

function show_bulls_eye(egg) {
  bullseye_num = egg.attr("data-bullseye");
  $("#bullseye" + bullseye_num).show();
  hide_bulls_eye(bullseye_num);
}

function hide_bulls_eye(bullseye_num) {
  setTimeout(function () {
    $("#bullseye" + bullseye_num).hide();
  }, 800);
}

function decrement_life() {
  life--;
  life_span.text(life);
}

function check_egg_hits_nest(egg) {
  if (collision(egg, nest)) {
    egg_top = parseInt(egg.css("top"));
    if (egg_top < nest_top) {
      update_score();
      return true;
    }
  }
  return false;
}

function update_score() {
  score++;
  if (score % 10 === 0 && speed <= max_speed) {
    speed++;
  }
  score_span.text(score);
  score_1.text(score);
}

function stop_the_game() {
  cancelAnimationFrame(anim_id);
  restart.slideDown();
}

restart.click(function () {
  location.reload();
});

function collision($div1, $div2) {
  let x1 = $div1.offset().left;
  let y1 = $div1.offset().top;
  let h1 = $div1.outerHeight(true);
  let w1 = $div1.outerWidth(true);
  let b1 = y1 + h1;
  let r1 = x1 + w1;
  let x2 = $div2.offset().left;
  let y2 = $div2.offset().top;
  let h2 = $div2.outerHeight(true);
  let w2 = $div2.outerWidth(true);
  let b2 = y2 + h2;
  let r2 = x2 + w2;

  if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
  return true;
}
