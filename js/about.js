(function() {
    var box = document.querySelector('#J_NjvAbout');
    var repoApi = 'https://api.github.com/users/mailzwj/repos';
    var myRepos = [];

    function renderRepos(data) {
        var boxWidth = box.offsetWidth;
        var winWidth = window.innerWidth;
        var itemWidth = boxWidth * 0.24;
        var repos = data || [];
        var len = repos.length;
        if ('HTMLPortalElement' in window) {
            for (var x = 0; x < len; x++) {
                var item = document.createElement('portal');
                item.className = 'njv-portal';
                item.src = `//newjs.vip/${repos[x].name}`;
                item.style.cssText = `width: ${winWidth}px;height: ${(winWidth / itemWidth) * 108}px;transform-origin: left top;transform: scale(${itemWidth / winWidth});`;
                box.appendChild(item);
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
        myRepos(data);
        renderRepos(data);
    });
})();
