/**
 * Created by wangjunkai on 2017/7/11.
 */
$(function () {

  const socket = new WebSocket('ws://localhost:12301');

  const $input = $('.inputMessage');
  const $ul = $('.pages');

  socket.onopen = function (ev) {
    console.log('connect ok..');
  };
  socket.onmessage = function (ev) {
    $ul.append('<li>' + ev.data + '</li>')
  };


  $(window).keydown(function (event) {
    if (event.which === 13) {
      socket.send($input.val())
    }
  });
});