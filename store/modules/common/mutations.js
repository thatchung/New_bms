export default {
  set_token(state, payload) {
    if (!process.server) {
      if ((window.localStorage && !window.localStorage.hasOwnProperty('session_kol') && !window.localStorage.hasOwnProperty('profile_kol')) || payload.data.recache) {
        window.localStorage.setItem('session_kol', payload.data.token);
        window.localStorage.setItem('profile_kol', JSON.stringify(payload.data));
        this.$cookies.set('session_kol', payload.data.token, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30 * 6
        });
        this.$cookies.set('profile_kol', payload.data, {
          path: '/',
          maxAge: 60 * 60 * 24 * 30 * 6
        });

      } else {
        let ses = JSON.parse(window.localStorage.getItem('profile_kol') || '{}');
        payload.data.profile = ses;
        payload.data.session = ses.token;
      }
    }

    if (payload.data) {
      payload.data.avatar_link = payload.data.avatar_link ? payload.data.avatar_link : '/images/logo.png';
      state.session = payload.data.token;
      state.profile = payload.data;
    }
  },

  clearSession(state) {
    if (window.localStorage) {
      window.localStorage.removeItem('session_kol');
      window.localStorage.removeItem('profile_kol');
      if (this.$cookies) {
        this.$cookies.remove('session_kol');
        this.$cookies.remove('profile_kol');
      }

    }
    state.session = null;
    state.profile = null;

  }
};
