var burger = document.querySelector('.burger');
var menu = document.getElementById('menu');
var track = document.querySelector('.track');
var ids = ['home', 'contact', 'privacy', 'terms'];
var titles = ['Couple Widget: Little notes on your partner’s Home Screen', 'Contact: Couple Widget', 'Privacy Policy: Couple Widget', 'Terms of Use: Couple Widget'];

function setMenu(open) {
  menu.hidden = !open;
  burger.setAttribute('aria-expanded', String(open));
  burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  burger.querySelector('path').setAttribute('d', open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16');
}

function show() {
  var i = Math.max(0, ids.indexOf(location.hash.slice(1)));
  track.style.transform = 'translateX(' + (-25 * i) + '%)';
  ids.forEach(function (id, n) {
    var panel = document.getElementById('panel-' + id);
    panel.setAttribute('aria-hidden', n === i ? 'false' : 'true');
    panel.inert = n !== i;
    if (n === i) panel.scrollTop = 0;
  });
  document.querySelectorAll('.links a, .menu a').forEach(function (a) {
    if (a.getAttribute('href') === '#' + ids[i]) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
  document.body.classList.toggle('inner', i !== 0);
  document.title = titles[i];
  setMenu(false);
}

burger.addEventListener('click', function () { setMenu(menu.hidden); });
window.addEventListener('hashchange', show);
show();

var form = document.getElementById('contact-form');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var message = document.getElementById('message').value.trim();
  var body = message + '\n\n' + (name ? name + '\n' : '') + email;
  window.location.href = 'mailto:' + form.dataset.to + '?subject=' + encodeURIComponent('Couple Widget support') + '&body=' + encodeURIComponent(body);
  form.hidden = true;
  document.getElementById('sent').hidden = false;
});
