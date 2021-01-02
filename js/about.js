(function() {
    var box = document.querySelector('#J_NjvAbout');
    var repoApi = 'https://api.github.com/users/mailzwj/repos';

    function renderRepos(data) {
        var repos = data || [];
        var len = repos.length;
        if ('HTMLPortalElement' in window) {
        // if (false) {
            for (var x = 0; x < len; x++) {
                var item = document.createElement('portal');
                item.className = 'njv-portal';
                item.src = `//newjs.vip/${repos[x].name}`;
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
        renderRepos(data);
    });
})();
