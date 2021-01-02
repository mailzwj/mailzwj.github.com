(function() {
    var box = document.querySelector('#J_NjvAbout');
    var repoApi = 'https://api.github.com/users/mailzwj/repos';
    var myRepos = [];
    var transPrefix = '';

    if ('webkitTransform' in box.style) {
        transPrefix = '-webkit-';
    } else if ('mozTransform' in box.style) {
        transPrefix = '-moz-';
    } else if ('msTransform' in box.style) {
        transPrefix = '-ms-';
    }

    function renderRepos(data) {
        var boxWidth = box.offsetWidth;
        var winWidth = window.innerWidth;
        var itemWidth = boxWidth * 0.24;
        var repos = data || [];
        var len = repos.length;
        if ('HTMLPortalElement' in window) {
            for (var x = 0; x < len; x++) {
                var repo = repos[x] || {};
                var div = document.createElement('div');
                var item = document.createElement('portal');
                var link = document.createElement('a');
                var ct = `width: ${winWidth}px;height: ${(winWidth / itemWidth) * 108}px;`;
                ct += `${transPrefix}transform-origin: left top;${transPrefix}transform: scale(${itemWidth / winWidth});`;
                div.className = 'njv-portal';
                link.className = 'njv-portal-link';
                link.href = `//newjs.vip/${repo.name}`;
                link.setAttribute('target', '_blank');
                item.src = `//newjs.vip/${repo.name}`;
                item.style.cssText = ct;
                div.appendChild(item);
                box.appendChild(div);
            }
        } else {
            for(var x = 0; x < len; x++) {
                var repo = repos[x] || {};
                var item = document.createElement('a');
                item.className = 'njv-item';
                item.href = `//newjs.vip/${repo.name}`;
                item.setAttribute('target', '_blank');
                item.innerHTML = repo.name;
                box.appendChild(item);
            }
        }
    }

    axios.get(repoApi).then(function(res) {
        return res.data || [];
    }).then(function(data) {
        myRepos = data;
        renderRepos(data);
    });

    window.addEventListener('reset', () => {
        if (myRepos.length) {
            box.innerHTML = '';
            renderRepos(myRepos);
        }
    }, false);
})();
