const mineflayer = require("mineflayer");
const { Vec3 } = require("vec3");

const bot = mineflayer.createBot({
  host: "",
  port: "",
  username: "",
  password: "",
  auth: "",
});

bot.on("login", () => {
  console.log("Logged in.");
});

let k = 0;
let z = 14;

bot.on("chat", (username, message) => {
  if (username === bot.username) return;

  switch (message) {
    case "!setScoreboard":
      //각도 변환값 스코어보드에 저장
      for (var i = 0; i < 100; i++) {
        let tan = i; //-i //기울기
        let angle = parseInt(Math.atan(i) * (180 / Math.PI)); //역탄젠트 변환
        bot.chat(`/scoreboard players set ${tan} tan ${angle}`); //결과값 저장
      }
      break;

    case "!store":
      // 커맨드 블록에 값 저장
      setInterval(() => {
        if (k > 100) return bot.chat("done");
        bot
          .lookAt(new Vec3(16, 1, z))
          .then(() => {
            bot.setCommandBlock(
              new Vec3(16, 1, z),
              `/execute as @e[tag=x-] at @s run execute as @e[tag=fx,sort=nearest,limit=1] at @s if score f'(x-) Coordinates matches -${k} run execute store result entity @s Pose.Head[2] float 1 run scoreboard players get -${k} tan`,
              true
            );
          })
          .then(() => {
            setTimeout(() => {
              bot.chat("/tp @s ~ ~ ~1");
            }, 500 * i);

            k++;
            z++;
          });
      }, 500);
      break;
  }
});
