(window.webpackJsonp = window.webpackJsonp || []).push([
  [0],
  {
    100: function(e, t, a) {
      'use strict';
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(7),
        c = a.n(s);
      t.a = c()(function(e) {
        return {
          root: {
            userSelect: 'none',
            width: '1em',
            height: '1em',
            display: 'inline-block',
            fill: 'currentColor',
            flexShrink: 0,
            fontSize: 24,
            transition: e.transitions.create('fill', {
              duration: e.transitions.duration.shorter,
            }),
          },
        };
      })(function(e) {
        return r.a.createElement(
          'svg',
          {
            className: o()(e.classes.root, e.className),
            focusable: 'false',
            width: '24',
            height: '24',
            viewBox: '0 0 24 24',
          },
          r.a.createElement('path', { fill: 'none', d: 'M0 0h24v24H0V0z' }),
          r.a.createElement('path', {
            d:
              'M23,12 L20.56,9.22 L20.9,5.54 L17.29,4.72 L15.4,1.54 L12,3 L8.6,1.54 L6.71,4.72 L3.1,5.53 L3.44,9.21 L1,12 L3.44,14.78 L3.1,18.47 L6.71,19.29 L8.6,22.47 L12,21 L15.4,22.46 L17.29,19.28 L20.9,18.46 L20.56,14.78 L23,12 Z M18.49,14.11 L18.75,16.9 L16.01,17.52 L14.58,19.93 L12,18.82 L9.42,19.93 L7.99,17.52 L5.25,16.9 L5.51,14.1 L3.66,12 L5.51,9.88 L5.25,7.1 L7.99,6.49 L9.42,4.08 L12,5.18 L14.58,4.07 L16.01,6.48 L18.75,7.1 L18.49,9.89 L20.34,12 L18.49,14.11 Z M17.3446445,9.955 L15.9296445,8.54 L10.75,13.7196445 L8.16,11.1396445 L6.75,12.5496445 L10.75,16.5496445 L17.3446445,9.955 Z',
          })
        );
      });
    },
    101: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return n;
      });
      var n = [
        'University of Sydney\u2063 (USYD)',
        'University of New South Wales\u2063 (UNSW)',
        'Macquarie University\u2063 (MQ)',
        'University of Technology Sydney\u2063 (UTS)',
        'Western Sydney University\u2063 (WSU)',
        'University of Notre Dame\u2063 (UND)',
        'University of Wollongong\u2063 (UW)',
        'University of Newcastle\u2063 (UN)',
        'Australian Catholic University\u2063 (ACU)',
        'Harvard University',
        'Massachusetts Institute of Technology\u2063 (MIT)',
        'University of California--Berkeley',
        'Stanford University',
        'University of Oxford',
        'University of Cambridge',
        'California Institute of Technology',
        'University of California--Los Angeles',
        'University of Chicago',
        'Columbia University',
        'Johns Hopkins University',
        'Imperial College London',
        'Princeton University',
        'University of Michigan',
        'University of Toronto',
        'University of Washington',
        'Yale University',
        'University of California--San Diego',
        'University of Pennsylvania',
        'Duke University',
        'University College London',
        'University of California--San Francisco',
        'Cornell University',
        'University of Tokyo',
        'Northwestern University',
        'Swiss Federal Institute of Technology Zurich',
        'University of Wisconsin--Madison',
        'University of California--Santa Barbara',
        'University of Minnesota--Twin Cities',
        'University of British Columbia',
        'University of Texas--Austin',
        'University of Melbourne',
        'University of North Carolina--Chapel Hill',
        'Ohio State University',
        'University of Illinois Urbana-Champaign',
        'New York University',
        'Boston University',
        'University of California--Davis',
        'Peking University',
        'University of Edinburgh',
        'Washington University',
        'University of Hong Kong',
        'University of Pittsburgh',
        'McGill University',
        'Pierre and Marie Curie University - Paris 6',
        'University of Queensland Australia',
        'University of Munich',
        'University of Manchester',
        'University of Southern California',
        'University of Maryland--College Park',
        'Pennsylvania State University',
      ];
    },
    116: function(e, t, a) {
      'use strict';
      var n = a(12),
        r = a(14),
        i = a(33),
        o = a(0),
        s = a(224),
        c = function(e, t) {
          if (!t.type) return Object(r.a)({}, e, t);
          switch (t.type) {
            case 'more':
              return e.limit < e.cap
                ? Object(r.a)({}, e, { limit: e.limit + 10 })
                : Object(r.a)({}, e);
          }
        },
        l = {
          documents: [],
          prevFilters: null,
          prevPath: null,
          path: null,
          filters: [],
          prevLimit: 0,
          limit: 20,
          loading: !0,
          cap: 50,
        };
      t.a = function(e) {
        var t = Object(o.useReducer)(c, Object(r.a)({}, l, e)),
          a = Object(n.a)(t, 2),
          u = a[0],
          d = a[1],
          m = function(e, t, a) {
            u.prevPath && u.path !== u.prevPath && u.unsubscribe(),
              d({
                prevFilters: e,
                prevLimit: t,
                prevPath: u.path,
                loading: !0,
              });
            var n = i.c.collection(u.path);
            e.forEach(function(e) {
              n = n.where(e.field, e.operator, e.value);
            }),
              a &&
                (Array.isArray(a)
                  ? a.forEach(function(e) {
                      n = n.orderBy(e.field, e.direction);
                    })
                  : (n = n.orderBy(a.field, a.direction)));
            var o = n.limit(t).onSnapshot(function(e) {
              if (e.docs.length > 0) {
                var t = e.docs.map(function(e) {
                  var t = e.data(),
                    a = e.id;
                  return Object(r.a)({}, t, { id: a });
                });
                d({ documents: t, loading: !1 });
              } else d({ documents: [], loading: !1 });
            });
            d({ unsubscribe: o });
          };
        return (
          Object(o.useEffect)(
            function() {
              var e = u.prevFilters,
                t = u.filters,
                a = u.prevLimit,
                n = u.limit,
                r = u.prevPath,
                i = u.path,
                o = u.sort,
                c = u.unsubscribe;
              return (
                (Object(s.a)(e, t) && a === n && r === i) || (i && m(t, n, o)),
                function() {
                  c && u.unsubscribe();
                }
              );
            },
            [u.filters, u.limit, u.path]
          ),
          [u, d]
        );
      };
    },
    123: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(53),
        c = a(0),
        l = a.n(c),
        u = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(
                this,
                Object(o.a)(t).call(this, e)
              )).handleChange = function(e) {
                return function(t) {
                  var n = t.target.value;
                  n || a.props.changeHandler(e, ' '),
                    a.props.changeHandler(e, n.trim());
                };
              }),
              (a.handleChange = a.handleChange),
              a
            );
          }
          return (
            Object(s.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentDidUpdate',
                value: function(e, t) {
                  t !== this.state &&
                    this.props.changeHandler(
                      this.props.name,
                      this.state.inputValue
                    );
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this,
                    t = this.props.children,
                    a = l.a.Children.map(t, function(t) {
                      return l.a.cloneElement(t, {
                        changeHandler: e.handleChange,
                      });
                    });
                  return l.a.createElement(
                    'div',
                    { style: { width: '100%' } },
                    a
                  );
                },
              },
            ]),
            t
          );
        })(l.a.Component);
      t.default = u;
    },
    13: function(e, t, a) {
      'use strict';
      a.d(t, 'p', function() {
        return n;
      }),
        a.d(t, 'j', function() {
          return r;
        }),
        a.d(t, 'r', function() {
          return i;
        }),
        a.d(t, 'o', function() {
          return o;
        }),
        a.d(t, 'm', function() {
          return s;
        }),
        a.d(t, 's', function() {
          return c;
        }),
        a.d(t, 'e', function() {
          return l;
        }),
        a.d(t, 'k', function() {
          return u;
        }),
        a.d(t, 'q', function() {
          return d;
        }),
        a.d(t, 'f', function() {
          return m;
        }),
        a.d(t, 'l', function() {
          return p;
        }),
        a.d(t, 'i', function() {
          return g;
        }),
        a.d(t, 'h', function() {
          return h;
        }),
        a.d(t, 'b', function() {
          return f;
        }),
        a.d(t, 'a', function() {
          return b;
        }),
        a.d(t, 'c', function() {
          return E;
        }),
        a.d(t, 'g', function() {
          return y;
        }),
        a.d(t, 'd', function() {
          return v;
        }),
        a.d(t, 'n', function() {
          return x;
        });
      var n = '/signup',
        r = '/logout',
        i = '/speedySignup',
        o = '/signin',
        s = '/resetPassword',
        c = '/validateEmail',
        l = '/createPassword',
        u = '/noPassword',
        d = '/smartLinks',
        m = '/dashboard',
        p = '/profile',
        g = '/jobs',
        h = '/job',
        f = '/assessments',
        b = '/assessment',
        E = '/courses',
        y = '/events',
        v = '/courseRedirect',
        x = '/scheduler';
    },
    1321: function(e, t, a) {
      var n = { react: a(0) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'Built with React 16.8, [Material-UI](https://material-ui.com) 4, and Firebase.\n\nDocumentation started with version 3.1 in June 2019.\n\n## Changelog\n\n### 3.1 \u2013 June 2019\n\n### 3.0 \u2013\xa0February 2019\n\nReleased during UNSW O Week 2019.\n\n### 2.0 \u2013 September 2018\n\n### 1.0 \u2013\xa0Early 2018',
          },
        ]);
    },
    136: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(11),
        o = a(117),
        s = a(9),
        c = a(688),
        l = a.n(c);
      t.default = function(e) {
        var t = e.isLoading,
          a = e.email,
          n = e.backHandler;
        return r.a.createElement(
          i.a,
          {
            key: 'back-bar',
            style: {
              width: '100%',
              borderStyle: 'solid',
              borderRadius: 30,
              height: 40,
              borderWidth: 1,
              borderColor: '#aeaeae',
              marginBottom: 20,
            },
            container: !0,
            direction: 'row',
            alignItems: 'center',
            justify: 'flex-start',
          },
          r.a.createElement(
            o.a,
            {
              disabled: t,
              'aria-label': 'back',
              style: { marginLeft: 4, width: 32, height: 32, padding: 0 },
              id: 'back-to-email',
              onClick: n,
            },
            r.a.createElement(l.a, null)
          ),
          r.a.createElement(
            s.a,
            {
              variant: a.length < 30 ? 'body2' : 'caption',
              style: {
                marginLeft: 5,
                color: '#000',
                maxWidth: '75%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              },
            },
            a
          )
        );
      };
    },
    137: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(30),
        c = a(53),
        l = a(0),
        u = a.n(l),
        d = a(7),
        m = a.n(d),
        p = a(117),
        g = a(1675),
        h = a(1688),
        f = a(1677),
        b = a(1676),
        E = a(691),
        y = a.n(E),
        v = a(690),
        x = a.n(v),
        j = a(258),
        S = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(this, Object(o.a)(t).call(this, e))).state = {
                showPassword: !1,
              }),
              (a.handleClickShowPassword = a.handleClickShowPassword.bind(
                Object(s.a)(a)
              )),
              a
            );
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'handleClickShowPassword',
                value: function() {
                  this.setState({ showPassword: !this.state.showPassword });
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.classes,
                    a = e.changeHandler,
                    n = e.value,
                    r = e.label,
                    i = e.handleKeyPress;
                  return u.a.createElement(
                    b.a,
                    { style: { width: '100%' } },
                    u.a.createElement(
                      h.a,
                      { htmlFor: 'passwordField' },
                      r || 'Password'
                    ),
                    u.a.createElement(g.a, {
                      id: 'passwordField',
                      type: this.state.showPassword ? 'text' : 'password',
                      value: n,
                      fullWidth: !0,
                      onChange: a('password'),
                      onKeyPress: i,
                      endAdornment: u.a.createElement(
                        f.a,
                        { position: 'end' },
                        u.a.createElement(
                          p.a,
                          {
                            style: { width: 30, height: 30, padding: 0 },
                            'aria-label': 'Toggle password visibility',
                            onClick: this.handleClickShowPassword,
                            onMouseDown: this.handleMouseDownPassword,
                          },
                          this.state.showPassword
                            ? u.a.createElement(x.a, null)
                            : u.a.createElement(y.a, null)
                        )
                      ),
                      classes: { input: t.input },
                    })
                  );
                },
              },
            ]),
            t
          );
        })(u.a.Component);
      t.default = m()({ input: { height: 'auto' } })(Object(j.withOnEnter)(S));
    },
    138: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(7),
        s = a.n(o),
        c = a(11),
        l = a(9),
        u = a(79);
      t.default = s()(function(e) {
        return {
          root: Object(n.a)(
            {
              boxSizing: 'border-box',
              padding: ''
                .concat(e.spacing(4), 'px ')
                .concat(e.spacing(1), 'px'),
              margin: '0 auto',
              userSelect: 'none',
            },
            e.breakpoints.down('sm'),
            {
              width: 'calc(100% - '.concat(e.spacing(2), 'px) !important'),
              maxWidth: '660px !important',
            }
          ),
          title: {
            fontWeight: 500,
            display: 'block',
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
          },
          subtitle: {
            marginTop: e.spacing(1.5),
            fontWeight: 400,
            display: 'block',
          },
          paddedIcon: {
            marginTop: -e.spacing(1) / 2,
            marginLeft: -e.spacing(1) / 2,
            marginRight: e.spacing(2),
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.title,
          n = e.subtitle,
          r = e.maxWidth,
          o = e.icon;
        return i.a.createElement(
          'header',
          { className: t.root, style: { maxWidth: r } },
          i.a.createElement(
            c.a,
            { container: !0, wrap: 'nowrap', alignItems: 'flex-start' },
            o &&
              i.a.createElement(
                c.a,
                { item: !0 },
                i.a.createElement(u.default, { className: t.paddedIcon }, o)
              ),
            i.a.createElement(
              c.a,
              { item: !0, xs: !0 },
              i.a.createElement(l.a, { variant: 'h4', className: t.title }, a),
              i.a.createElement(
                l.a,
                { variant: 'h6', className: t.subtitle },
                n
              )
            )
          )
        );
      });
    },
    141: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'CARD_WIDTH', function() {
          return w;
        }),
        a.d(t, 'CARD_PADDING', function() {
          return C;
        });
      var n = a(0),
        r = a.n(n),
        i = a(31),
        o = a.n(i),
        s = a(16),
        c = a.n(s),
        l = a(64),
        u = a(7),
        d = a.n(u),
        m = a(49),
        p = a.n(m),
        g = a(139),
        h = a.n(g),
        f = a(1684),
        b = a(1685),
        E = a(1687),
        y = a(1686),
        v = a(1683),
        x = a(36),
        j = a(9),
        S = a(11),
        N = a(67),
        k = a.n(N),
        O = a(5),
        w = 320,
        C = 16,
        T = 0.5625 * w;
      t.default = Object(l.a)(
        d()(function(e) {
          return {
            root: {
              margin: C / 2,
              width: w,
              transition: e.transitions.create(['box-shadow', 'transform']),
              boxShadow:
                '0 0 0 1px rgba(0,0,0,.025), 0 10px 20px rgba(0,0,0,.1)',
              '&:hover': {
                boxShadow: e.shadows[24],
                transform: 'translateY(-4px)',
                '& $media:not($video), & $banner': { opacity: 0.9 },
              },
              '&:active': {
                transform: 'translateY(0) scale(0.95)',
                boxShadow: '0 10px 30px rgba(0,0,0,.14)',
                transitionDuration: '.2s',
              },
            },
            withVideo: {},
            cardActionArea: {
              textAlign: 'right',
              height: '100%',
              transition: e.transitions.create('background-color', {
                duration: e.transitions.duration.shortest,
              }),
              '&:hover': { backgroundColor: 'transparent' },
            },
            focusVisible: { backgroundColor: e.palette.action.hover },
            banner: {
              background: e.palette.divider,
              transition: e.transitions.create('opacity'),
              textAlign: 'left',
              padding: ''
                .concat(e.spacing(1), 'px ')
                .concat(e.spacing(2), 'px'),
              margin: '0 '
                .concat(2 * -e.spacing(1), 'px ')
                .concat(e.spacing(1), 'px'),
              '& svg': { verticalAlign: 'bottom', marginRight: e.spacing(1) },
            },
            bannerText: {
              fontWeight: 500,
              position: 'relative',
              top: 1,
              '& small': { marginLeft: e.spacing(1), opacity: 0.67 },
            },
            bannerGreen: {
              backgroundColor: p.a[100],
              '& *': { color: p.a[800] },
            },
            bannerRed: {
              backgroundColor: h.a[100],
              '& *': { color: h.a[800] },
            },
            bannerOrange: {
              backgroundColor: e.palette.primary.light,
              '& *': { color: e.palette.primary.main },
            },
            media: {
              width: 100,
              height: 100,
              borderRadius: 0.75 * e.shape.borderRadius,
              transition: e.transitions.create('opacity'),
              marginLeft: e.spacing(1),
              marginBottom: e.spacing(1),
            },
            gradient: {
              backgroundImage: 'linear-gradient(-15deg, #fa0, '.concat(
                e.palette.primary.main,
                ')'
              ),
            },
            video: {
              width: '100%',
              height: 0,
              position: 'relative',
              paddingBottom: '56.25%',
            },
            iframe: {
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
            },
            stretchGrid: {
              height: '100%',
              '$withVideo &': { height: 'calc(100% - '.concat(T, 'px)') },
            },
            cardContent: {
              textAlign: 'left',
              paddingBottom: e.spacing(1),
              '&:last-child': { paddingBottom: e.spacing(1) },
            },
            cardContentHeaderWithImg: { minHeight: 125 },
            secondaryText: { whiteSpace: 'pre-wrap' },
            cardActions: {
              justifyContent: 'flex-end',
              paddingTop: 0,
              paddingRight: 0,
            },
            arrowForwardIcon: {
              'svg&': { marginRight: 0, marginLeft: e.spacing(0.5) },
            },
            primaryButton: { '&:hover': { backgroundColor: 'transparent' } },
          };
        })(function(e) {
          var t,
            a = e.classes,
            n = e.title,
            i = e.meta,
            s = e.secondaryText,
            l = e.primaryAction,
            u = e.route,
            d = e.banner,
            m = e.bannerColor,
            p = e.image,
            g = e.video,
            h = e.gradient,
            N = e.history;
          return (
            (t = g
              ? r.a.createElement(
                  'div',
                  { className: a.video },
                  r.a.createElement('iframe', {
                    src: g,
                    className: a.iframe,
                    title: n + ' video',
                    frameBorder: 'none',
                    allow: 'accelerometer; encrypted-media; picture-in-picture',
                    allowFullScreen: !0,
                  })
                )
              : p
              ? r.a.createElement(v.a, { className: a.media, image: p })
              : r.a.createElement('div', {
                  className: a.gradient,
                  style: { backgroundImage: h },
                })),
            o.a.updateLocale('en', O.MOMENT_LOCALES),
            r.a.createElement(
              f.a,
              { classes: { root: c()(a.root, g && a.withVideo) } },
              r.a.createElement(
                b.a,
                {
                  id: n.replace(/\W/g, ''),
                  component: 'div',
                  onClick: function() {
                    N.push(u);
                  },
                  classes: { root: a.cardActionArea },
                  focusVisibleClassName: a.focusVisible,
                  disableRipple: !0,
                },
                g && t,
                r.a.createElement(
                  S.a,
                  {
                    container: !0,
                    direction: 'column',
                    className: a.stretchGrid,
                    wrap: 'nowrap',
                  },
                  r.a.createElement(
                    S.a,
                    { item: !0, xs: !0 },
                    r.a.createElement(
                      y.a,
                      { classes: { root: a.cardContent } },
                      r.a.createElement(
                        S.a,
                        {
                          container: !0,
                          wrap: 'nowrap',
                          className: !g && t ? a.cardContentHeaderWithImg : '',
                        },
                        r.a.createElement(
                          S.a,
                          { item: !0, xs: !0 },
                          r.a.createElement(
                            j.a,
                            {
                              gutterBottom: !0,
                              variant: 'h6',
                              className: a.title,
                            },
                            n
                          ),
                          i
                        ),
                        r.a.createElement(S.a, { item: !0 }, !g && t)
                      ),
                      d &&
                        r.a.createElement(
                          'div',
                          {
                            className: c()(
                              a.banner,
                              'green' === m && a.bannerGreen,
                              'red' === m && a.bannerRed,
                              'orange' === m && a.bannerOrange
                            ),
                          },
                          r.a.createElement(
                            j.a,
                            { variant: 'body1', className: a.bannerText },
                            d
                          )
                        ),
                      'string' == typeof s
                        ? r.a.createElement(
                            j.a,
                            { component: 'p', className: a.secondaryText },
                            s
                          )
                        : s
                    )
                  ),
                  r.a.createElement(
                    S.a,
                    { item: !0 },
                    r.a.createElement(
                      E.a,
                      { className: a.cardActions },
                      r.a.createElement(
                        x.a,
                        {
                          color: 'primary',
                          id: 'button-'.concat(n),
                          className: a.primaryButton,
                          disableRipple: !0,
                        },
                        l,
                        r.a.createElement(k.a, {
                          className: a.arrowForwardIcon,
                        })
                      )
                    )
                  )
                )
              )
            )
          );
        })
      );
    },
    1430: function(e, t) {},
    1432: function(e, t) {},
    1443: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'App',
        methods: [],
        doclets: {},
        examples: a(1444),
      };
    },
    1444: function(e, t, a) {
      var n = { react: a(0), './App.js': a(651) },
        r = a(85).default.bind(null, n),
        i = a(86).default.bind(
          null,
          "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst App$0 = require('./App.js');\nconst App = App$0.default || App$0;",
          r
        );
      e.exports = [
        {
          type: 'markdown',
          content:
            'Handles routing and provides contexts.\n\n### Routes\n\n| Route             | Container                                           |\n| ----------------- | --------------------------------------------------- |\n| `SIGN_UP`         | [AuthenticationContainer](#authenticationcontainer) |\n| `LOG_OUT`         | [AuthenticationContainer](#authenticationcontainer) |\n| `SIGN_IN`         | [AuthenticationContainer](#authenticationcontainer) |\n| `NO_PASSWORD`     | [AuthenticationContainer](#authenticationcontainer) |\n| `CREATE_PASSWORD` | [AuthenticationContainer](#authenticationcontainer) |\n| `RESET_PASSWORD`  | [AuthenticationContainer](#authenticationcontainer) |\n| `VALIDATE_EMAIL`  | [AuthenticationContainer](#authenticationcontainer) |\n| `SPEEDY_SIGN_UP`  | [SpeedySignupContainer](#speedysignupcontainer)     |\n| `SMART_LINK`      | [SmartLinkContainer](#smartlinkcontainer)           |\n| `DASHBOARD`       | [DashboardContainer](#dashboardcontainer)           |\n| `PROFILE`         | [ProfileContainer](#profilecontainer)               |\n| `JOBS`            | [JobsContainer](#jobscontainer)                     |\n| `JOB`             | [DetailedViewContainer](#detailedviewcontainer)     |\n| `ASSESSMENTS`     | [AssessmentsContainer](#assessmentscontainer)       |\n| `ASSESSMENT`      | [DetailedViewContainer](#detailedviewcontainer)     |\n| `COURSES`         | [CoursesContainer](#coursescontainer)               |\n| `COURSE_REDIRECT` | [CourseRedirectContainer](#courseredirectcontainer) |\n| `SCHEDULER`       | [SchedulerContainer](#schedulercontainer)           |\n| `/`               | [Landing](#landing)                                 |\n| `/linkedin`       | `LinkedInPopUp` 3rd-party component (DEPRECATED)    |\n\n### `UserContext`\n\nDefault: `{ user: user, setUser: user => setUser(user) }` from',
        },
        {
          type: 'code',
          content: 'const [user, setUser] = useState(null);',
          settings: {},
          evalInContext: i,
        },
        {
          type: 'markdown',
          content:
            '### `MuiThemeProvider`\n\nTakes theme from `src/Theme.js`\n\n### Deprecated\n\nLinkedIn sign in with `LinkedInPopUp` from the `/linkedin` route\n\n### TODO\n\nRemove `withAuthentication` HOC \u2013 see new Business Portal auth code',
        },
      ];
    },
    1445: function(e, t, a) {
      e.exports = {
        description:
          '**Redirects** users to [`/dashboard`](#section-dashboard) or **renders**\n[`AuthenticationContainer`](#authenticationcontainer).\n',
        displayName: 'Landing',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'authUser',
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      };
    },
    1446: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'TagTracker',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1447: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ErrorBoundary',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1448: function(e, t, a) {
      e.exports = {
        description: 'Renders a 404 page.\n',
        displayName: 'FourOhFour',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      };
    },
    1449: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'LoadingScreen',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'contained',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'message',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1450: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AuthenticationContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
        ],
        doclets: {},
        examples: a(1451),
      };
    },
    1451: function(e, t, a) {
      var n = { react: a(0), './AuthenticationContainer.js': a(334) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst AuthenticationContainer$0 = require('./AuthenticationContainer.js');\nconst AuthenticationContainer = AuthenticationContainer$0.default || AuthenticationContainer$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'Handles authentication with many different views listed in `src/constants/views`.\n\n### Back-end calls\n\n-   CloudFunctions\n-   `src/utilities/Authentication/warmUp.js`\n-   `src/utilities/Authentication/authWithPassword.js`\n-   `src/firebase/index.js`\n\n### TODO\n\nConvert to functional component with hooks.',
          },
        ]);
    },
    155: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'profileStyles', function() {
          return O;
        });
      var n = a(12),
        r = a(14),
        i = a(17),
        o = a(0),
        s = a.n(o),
        c = a(278),
        l = a(7),
        u = a.n(l),
        d = a(11),
        m = a(9),
        p = a(280),
        g = a(117),
        h = a(508),
        f = a(58),
        b = a(489),
        E = a(490),
        y = a(491),
        v = a(492),
        x = a(122),
        j = a.n(x),
        S = a(5),
        N = a(88),
        k = a(116),
        O = function(e) {
          return {
            infoPopper: { marginRight: 2 * -e.spacing(1) },
            infoPopperText: {
              margin: ''.concat(e.spacing(1), 'px ').concat(e.spacing(2), 'px'),
              width: 240,
            },
            paddedIcon: Object(i.a)(
              { marginLeft: e.spacing(2) },
              e.breakpoints.down('xs'),
              { marginLeft: -e.spacing(1) / 2 }
            ),
            titleWrapper: {
              marginBottom: e.spacing(2),
              minHeight: e.spacing(6),
              lineHeight: ''.concat(e.spacing(6), 'px'),
            },
            title: Object(i.a)({ fontWeight: 500 }, e.breakpoints.down('xs'), {
              marginTop: 0,
            }),
            browseButton: {
              marginTop: e.spacing(0.5),
              marginLeft: -e.spacing(1),
            },
            item: { '& + &': { marginTop: e.spacing(2) } },
            itemIcon: { height: 28, marginRight: e.spacing(1) },
            itemTitle: { lineHeight: '28px' },
            itemButton: {
              verticalAlign: 'baseline',
              marginLeft: -e.spacing(1),
              '& svg': {
                fontSize: 18,
                marginLeft: e.spacing(0.25),
                marginRight: 0,
                marginBottom: -1,
              },
            },
          };
        };
      t.default = Object(f.default)(
        u()(function(e) {
          return Object(
            r.a
          )({}, S.STYLES.DETAIL_VIEW(e), { root: Object(r.a)({}, S.STYLES.DETAIL_VIEW(e).root, { marginTop: e.spacing(2), marginBottom: e.spacing(5), '& h6': { fontWeight: 700 } }), title: Object(r.a)({}, S.STYLES.DETAIL_VIEW(e).title, { textAlign: 'left' }), infoPopper: { marginRight: 2 * -e.spacing(1) }, infoPopperText: { margin: ''.concat(e.spacing(1), 'px ').concat(e.spacing(2), 'px'), width: 240 } });
        })(function(e) {
          var t = e.classes,
            a = e.theme,
            r = e.user,
            i = Object(o.useState)(null),
            l = Object(n.a)(i, 2),
            u = l[0],
            f = l[1];
          Object(o.useEffect)(function() {
            document.title = '2hats \u2013 Profile';
          }, []);
          var x = Object(c.a)(a.breakpoints.down('xs')),
            O = Object(N.a)({
              path: ''.concat(S.COLLECTIONS.profiles, '/').concat(r.id),
            }),
            w = Object(n.a)(O, 1)[0],
            C = w.doc,
            T = Object(k.a)({
              path: ''
                .concat(S.COLLECTIONS.users, '/')
                .concat(r.id, '/')
                .concat(S.COLLECTIONS.assessments),
              filters: [{ field: 'outcome', operator: '==', value: 'pass' }],
              sort: { field: 'updatedAt', direction: 'desc' },
            }),
            _ = Object(n.a)(T, 1)[0],
            L = _.documents,
            I = Object(k.a)({
              path: ''
                .concat(S.COLLECTIONS.users, '/')
                .concat(r.id, '/')
                .concat(S.COLLECTIONS.courses),
              filters: [{ field: 'completed', operator: '==', value: !0 }],
              sort: { field: 'createdAt', direction: 'desc' },
            }),
            A = Object(n.a)(I, 1)[0],
            R = A.documents;
          return s.a.createElement(
            'div',
            { className: t.root },
            s.a.createElement(
              'main',
              { className: t.content },
              s.a.createElement(
                d.a,
                { container: !0 },
                s.a.createElement(
                  d.a,
                  { item: !0, xs: !0 },
                  s.a.createElement(
                    m.a,
                    { variant: 'h4', className: t.title },
                    'Your Work Profile'
                  )
                ),
                s.a.createElement(
                  d.a,
                  { item: !0, className: t.infoPopper },
                  s.a.createElement(
                    g.a,
                    {
                      id: 'work-info-button',
                      onClick: function(e) {
                        f(e.currentTarget);
                      },
                    },
                    s.a.createElement(j.a, null)
                  ),
                  s.a.createElement(
                    h.a,
                    {
                      open: !!u,
                      anchorEl: u,
                      onClose: function() {
                        f(null);
                      },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                      transformOrigin: { vertical: 'top', horizontal: 'right' },
                    },
                    s.a.createElement(
                      m.a,
                      { className: t.infoPopperText },
                      'Your Work Profile, excluding personal information, will be seen by potential employers when you apply for jobs.'
                    )
                  )
                )
              ),
              C &&
                s.a.createElement(
                  s.a.Fragment,
                  null,
                  s.a.createElement(
                    'div',
                    { className: t.section },
                    s.a.createElement(b.default, {
                      data: C,
                      user: r,
                      isMobile: x,
                    })
                  ),
                  s.a.createElement(
                    'div',
                    { className: t.section },
                    s.a.createElement(E.default, { data: L, isMobile: x })
                  ),
                  s.a.createElement(
                    'div',
                    { className: t.section },
                    s.a.createElement(y.default, { data: R, isMobile: x })
                  ),
                  s.a.createElement(
                    'div',
                    { className: t.section },
                    s.a.createElement(v.default, {
                      data: C.resume,
                      isMobile: x,
                    })
                  )
                ),
              (w.loading || _.loading || A.loading) &&
                s.a.createElement(
                  'div',
                  { className: t.section },
                  s.a.createElement(p.a, null)
                )
            )
          );
        })
      );
    },
    1566: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SpeedySignupContainer',
        methods: [],
        doclets: {},
        examples: a(1567),
      };
    },
    1567: function(e, t, a) {
      var n = { react: a(0), './SpeedySignupContainer.js': a(652) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst SpeedySignupContainer$0 = require('./SpeedySignupContainer.js');\nconst SpeedySignupContainer = SpeedySignupContainer$0.default || SpeedySignupContainer$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'Handles speedy signups.\n\nDisplays a variant of `LogoInCard`.\n\n### Back-end calls\n\n-   CloudFunctions\n-   **`src/firebase/auth`:** `doSignInWithCustomToken`\n\n### TODO\n\nConvert to functional component with hooks.',
          },
        ]);
    },
    1568: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'LogoInCard',
        methods: [],
        props: [
          {
            defaultValue: { value: '500', computed: !1 },
            required: !1,
            description: '',
            tags: {},
            name: 'height',
          },
          {
            defaultValue: { value: '320', computed: !1 },
            required: !1,
            description: '',
            tags: {},
            name: 'width',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1569: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SnackBar',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1570: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'StyledLink',
        methods: [],
        props: [
          {
            type: { name: 'node' },
            required: !0,
            description: '',
            tags: {},
            name: 'children',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'className',
          },
          {
            type: {
              name: 'enum',
              value: [{ value: "'primary'", computed: !1 }],
            },
            required: !1,
            description: '',
            tags: {},
            name: 'variant',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1571: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'BackBar',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1572: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Disclaimer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1573: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'EmailAuth',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1574: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'GoogleButton',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1575: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Header',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1576: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'LinkedinButton',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1577: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SignUpIntro',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1578: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AuthView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1579: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'CreatePasswordView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    158: function(e, t, a) {
      'use strict';
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(12),
        s = a(0),
        c = a.n(s),
        l = a(16),
        u = a.n(l),
        d = a(64),
        m = a(7),
        p = a.n(m),
        g = a(11),
        h = a(234),
        f = a(9),
        b = a(713),
        E = a.n(b),
        y = a(100),
        v = a(49),
        x = a.n(v),
        j = a(5),
        S = a(59),
        N = a(45);
      t.a = Object(d.a)(
        p()(function(e) {
          return {
            root: {
              display: 'inline-flex',
              width: 'auto',
              position: 'relative',
              borderRadius: e.shape.borderRadius / 2,
              padding: ''.concat(e.spacing(0.5), 'px 0'),
              paddingLeft: e.spacing(1),
              paddingRight: e.spacing(1.5),
              backgroundColor: e.palette.divider,
              margin: e.spacing(0.5),
            },
            buttonBase: {
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100%',
              borderRadius: e.shape.borderRadius / 2,
            },
            dense: { margin: e.spacing(0.25) },
            achieved: { backgroundColor: x.a[100], color: x.a[800] },
            skillIcon: {
              position: 'relative',
              marginRight: e.spacing(0.75),
              height: 24,
            },
            label: {
              lineHeight: '1.25',
              fontWeight: 500,
              '$achieved &': { color: x.a[800] },
            },
            header: { display: 'block', fontWeight: 500 },
          };
        })(function(e) {
          var t,
            a,
            n,
            l = e.classes,
            d = e.className,
            m = e.style,
            p = e.value,
            b = e.header,
            v = e.dense,
            x = e.history,
            k = e.clickable,
            O = Object(s.useContext)(S.a).user,
            w = Object(s.useState)(Object(j.getSkillLabel)(p)),
            C = Object(o.a)(w, 2),
            T = C[0],
            _ = C[1],
            L = Object(s.useState)(!p.id && '/assessment?skill='.concat(p)),
            I = Object(o.a)(L, 2),
            A = I[0],
            R = I[1],
            P = O.skills && (O.skills.includes(p) || O.skills.includes(p.id)),
            B = ((n = Object(i.a)(
              r.a.mark(function e(t) {
                var a;
                return r.a.wrap(function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          Object(N.c)(
                            ''
                              .concat(j.COLLECTIONS.users, '/')
                              .concat(O.id, '/')
                              .concat(j.COLLECTIONS.assessments),
                            [
                              {
                                field: 'assessmentId',
                                operator: '==',
                                value: t.id,
                              },
                            ],
                            [{ field: 'updatedAt', direction: 'desc' }]
                          )
                        );
                      case 2:
                        (a = e.sent),
                          R('/assessment?id='.concat(a, '&yours=true'));
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            )),
            function(e) {
              return n.apply(this, arguments);
            }),
            W = ((a = Object(i.a)(
              r.a.mark(function e(t) {
                var a;
                return r.a.wrap(function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (
                          (e.next = 2),
                          Object(N.c)(
                            j.COLLECTIONS.assessments,
                            [
                              {
                                field: 'skillAssociated',
                                operator: '==',
                                value: t,
                              },
                              { field: 'published', operator: '==', value: !0 },
                            ],
                            [{ field: 'updatedAt', direction: 'desc' }]
                          )
                        );
                      case 2:
                        return (a = e.sent), e.abrupt('return', a);
                      case 4:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            )),
            function(e) {
              return a.apply(this, arguments);
            }),
            D = ((t = Object(i.a)(
              r.a.mark(function e(t) {
                var a, n;
                return r.a.wrap(function(e) {
                  for (;;)
                    switch ((e.prev = e.next)) {
                      case 0:
                        return (e.next = 2), W(t);
                      case 2:
                        if (
                          ((a = e.sent),
                          !O.touchedAssessments ||
                            !O.touchedAssessments.includes(a))
                        ) {
                          e.next = 10;
                          break;
                        }
                        return (
                          (e.next = 6),
                          Object(N.c)(
                            ''
                              .concat(j.COLLECTIONS.users, '/')
                              .concat(O.id, '/')
                              .concat(j.COLLECTIONS.assessments),
                            [
                              {
                                field: 'assessmentId',
                                operator: '==',
                                value: a,
                              },
                            ],
                            [{ field: 'updatedAt', direction: 'desc' }]
                          )
                        );
                      case 6:
                        (n = e.sent),
                          R('/assessment?id='.concat(n, '&yours=true')),
                          (e.next = 11);
                        break;
                      case 10:
                        R('/assessment?id='.concat(a));
                      case 11:
                      case 'end':
                        return e.stop();
                    }
                }, e);
              })
            )),
            function(e) {
              return t.apply(this, arguments);
            });
          return (
            Object(s.useEffect)(
              function() {
                p.title && _(p.title),
                  k
                    ? O.touchedAssessments &&
                      O.touchedAssessments.includes(p.id)
                      ? B(p)
                      : R('/assessment?id='.concat(p.id))
                    : D(p);
              },
              [p]
            ),
            c.a.createElement(
              g.a,
              {
                onClick:
                  k && A
                    ? function() {
                        x.push(A);
                      }
                    : function() {},
                container: !0,
                className: u()(l.root, v && l.dense, P && l.achieved, d),
                style: m,
                alignItems: 'center',
                wrap: 'nowrap',
              },
              c.a.createElement(
                g.a,
                { item: !0, className: l.skillIcon },
                P ? c.a.createElement(y.a, null) : c.a.createElement(E.a, null)
              ),
              c.a.createElement(
                g.a,
                { item: !0, xs: !0 },
                c.a.createElement(
                  f.a,
                  { variant: 'body1', className: l.label },
                  c.a.createElement('span', { className: l.header }, b),
                  T
                )
              ),
              k && c.a.createElement(h.a, { className: l.buttonBase })
            )
          );
        })
      );
    },
    1580: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'MessageView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1581: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'NoPasswordView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1582: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'PasswordView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1583: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ResetPasswordView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1584: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SignUpView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1585: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SocialView',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1586: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ChangeAdaper',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1587: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(282);
      t.default = function(e) {
        var t = e.changeHandler,
          a = e.value;
        return r.a.createElement(i.a, {
          id: 'confirmPassword',
          key: 'confirmPassword',
          label: 'Confirm Password',
          value: a,
          onChange: t('confirmPassword'),
          style: { marginTop: 0, width: '100%', marginBottom: 5 },
          margin: 'normal',
          type: 'password',
        });
      };
    },
    1588: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ConfirmPassword',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1589: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Email',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    159: function(e, t, a) {
      'use strict';
      var n = a(12),
        r = a(0);
      t.a = function() {
        var e = 'object' == typeof window;
        function t() {
          return {
            width: e ? window.innerWidth : void 0,
            isMobile: e ? window.innerWidth < 670 : void 0,
            height: e ? window.innerHeight : void 0,
          };
        }
        var a = Object(r.useState)(t),
          i = Object(n.a)(a, 2),
          o = i[0],
          s = i[1];
        return (
          Object(r.useEffect)(function() {
            if (!e) return !1;
            function a() {
              s(t());
            }
            return (
              window.addEventListener('resize', a),
              function() {
                return window.removeEventListener('resize', a);
              }
            );
          }, []),
          o
        );
      };
    },
    1590: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Name',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1591: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Password',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1592: function(e, t, a) {
      e.exports = {
        methods: [],
        doclets: {},
        displayName: 'WithOnEnter',
        examples: null,
      };
    },
    1593: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SmartLinkContainer',
        methods: [],
        doclets: {},
        examples: a(1594),
      };
    },
    1594: function(e, t, a) {
      var n = { react: a(0), './SmartLinkContainer.js': a(639) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst SmartLinkContainer$0 = require('./SmartLinkContainer.js');\nconst SmartLinkContainer = SmartLinkContainer$0.default || SmartLinkContainer$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'Handles SmartLink routing using `handleKey()`.\n\nDisplays `LogoInCard` during loading states and errors.\n\n### Back-end calls\n\n-   CloudFunctions\n-   `src/store/index.js`\n\n### TODO\n\nClean up `handleKey()`',
          },
        ]);
    },
    1595: function(e, t, a) {
      e.exports = {
        methods: [],
        doclets: {},
        displayName: 'WithNavigation',
        examples: a(1596),
      };
    },
    1596: function(e, t, a) {
      var n = { react: a(0), './index.js': a(58) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst WithNavigation$0 = require('./index.js');\nconst WithNavigation = WithNavigation$0.default || WithNavigation$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'HOC: wraps component with a standard left navigation bar.\n\nUses `withAuthorisation` HOC to ensure authentication.\nIf not, redirects user to sign in, adding a deep link to the current route as a\nURL parameter.\n\nAlso has its own `ErrorBoundary` so nav is visible even when wrapped components\ncrash.\n\n### Back-end calls\n\n-   **`src/store/index.js`:** `auth`\n\n### TODO\n\nConvert to functional component with hooks.  \nNeed to modify `App.js`. See Business Portal code.',
          },
        ]);
    },
    1597: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'NavItem',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'func' },
            required: !1,
            description: '',
            tags: {},
            name: 'goTo',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'selected',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1598: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'User',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1599: function(e, t, a) {
      e.exports = {
        description:
          'Left nav account info edit dialog. To be removed in SP3.1\n',
        displayName: 'AccountInfoDialog',
        methods: [],
        props: [
          {
            type: { name: 'func' },
            required: !0,
            description: '',
            tags: {},
            name: 'setShowDialog',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        tags: {},
        examples: null,
      };
    },
    1600: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SuperAvatar',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1601: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SuperAvatarPlus',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'avatarURL',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'firstName',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'lastName',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1602: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'DashboardContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1603),
      };
    },
    1603: function(e, t, a) {
      var n = { react: a(0), './DashboardContainer.js': a(640) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst DashboardContainer$0 = require('./DashboardContainer.js');\nconst DashboardContainer = DashboardContainer$0.default || DashboardContainer$0;",
        r
      ),
        (e.exports = [{ type: 'markdown', content: 'User dashboard.' }]);
    },
    1604: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'BackButton',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1605: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ContainerHeader',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'node' },
            required: !0,
            description: '',
            tags: {},
            name: 'title',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'icon',
          },
          {
            type: { name: 'number' },
            required: !1,
            description: '',
            tags: {},
            name: 'maxWidth',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'subtitle',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1606: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'PaddedIcon',
        methods: [],
        props: [
          {
            type: { name: 'node' },
            required: !0,
            description: '',
            tags: {},
            name: 'children',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'className',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'color',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1608: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Milestones',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1609: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'MilestoneItem',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isXs',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'route',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'title',
          },
          {
            type: {
              name: 'union',
              value: [{ name: 'string' }, { name: 'number' }],
            },
            required: !0,
            description: '',
            tags: {},
            name: 'val',
          },
          {
            type: { name: 'func' },
            required: !1,
            description: '',
            tags: {},
            name: 'Icon',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    161: function(e, t, a) {
      'use strict';
      var n = a(90),
        r = a.n(n),
        i = (a(1671), a(33)),
        o = r.a.storage().ref(),
        s = a(700),
        c = a.n(s);
      a.d(t, 'a', function() {
        return p;
      }),
        a.d(t, 'b', function() {
          return g;
        });
      var l = c()(),
        u = new Image(),
        d = document.createElement('canvas'),
        m = new FileReader(),
        p = function(e, t) {
          (m.onloadend = function() {
            u.src = m.result;
            var a = i.a.currentUser.uid,
              n = 'candidates/'
                .concat(a, '/avatarPhotos/')
                .concat(Date.now(), '/')
                .concat(e.name || 'avatarPhoto');
            u.onload = function() {
              var a = { width: u.width, height: u.height };
              !(function(e, t, a, n) {
                var r = (function(e, t) {
                  return t < e ? 0.99 : e / t;
                })(
                  t,
                  (function(e, t) {
                    return e < t ? e : t;
                  })(a.width, a.height)
                );
                (d.width = a.width * r),
                  (d.height = a.height * r),
                  l
                    .resize(u, d)
                    .then(function(t) {
                      return l.toBlob(t, e);
                    })
                    .then(function(e) {
                      return n(e);
                    });
              })(e.type, 500, a, function(e) {
                g(n, e, t);
              });
            };
          }),
            m.readAsDataURL(e);
        };
      function g(e, t, a) {
        o.child(e)
          .put(t)
          .then(function(e) {
            o.child(e.metadata.fullPath)
              .getDownloadURL()
              .then(function(e) {
                a(e, t);
              });
          });
      }
    },
    1610: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ActivityIcon',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'type',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1611: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ActivityItem',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'func' },
            required: !1,
            description: '',
            tags: {},
            name: 'handleClick',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1612: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ActivityLog',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'func' },
            required: !0,
            description: '',
            tags: {},
            name: 'setShowDialog',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'showDialog',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1613: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'WhatsNext',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
          {
            type: { name: 'number' },
            required: !1,
            description: '',
            tags: {},
            name: 'width',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1614: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ResumeUploader',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'className',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'resetOnUpload',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1615: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'WhatsNextBadge',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'badge',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'isMobile',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1616: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'WhatsNextCta',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'state',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1617: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'WhatsNextDescription',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'state',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1618: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'WhatsNextIcon',
        methods: [],
        props: [
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'state',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1619: function(e, t, a) {
      e.exports = {
        methods: [],
        doclets: {},
        displayName: 'WhatsNextTitle',
        examples: null,
      };
    },
    1620: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Announcement',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'number' },
            required: !1,
            description: '',
            tags: {},
            name: 'width',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1621: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SpecialLabel',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'label',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'className',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'color',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1622: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AssessmentMeta',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1623: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'CardsHeader',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1624: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'CourseDetail',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1625: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Cards',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'number' },
            required: !0,
            description: '',
            tags: {},
            name: 'cols',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'mapping',
          },
          {
            type: { name: 'node' },
            required: !0,
            description: '',
            tags: {},
            name: 'title',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'useCollectionInit',
          },
          {
            type: { name: 'func' },
            required: !1,
            description: '',
            tags: {},
            name: 'Icon',
          },
          {
            type: { name: 'func' },
            required: !1,
            description: '',
            tags: {},
            name: 'NoneLeftIcon',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'extra',
          },
          {
            type: { name: 'array' },
            required: !1,
            description: '',
            tags: {},
            name: 'filterIds',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'hideMore',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'inline',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'mappingOverrides',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'noneLeftMsg',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'route',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'yourBackup',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1626: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'IndustryLabel',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1627: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'JobMeta',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1628: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'OneCard',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'banner',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'bannerColor',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'gradient',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'image',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'meta',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'primaryAction',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'route',
          },
          {
            type: { name: 'node' },
            required: !1,
            description: '',
            tags: {},
            name: 'secondaryText',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'title',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'video',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1629: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SkillsList',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1630: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'CoursesContainer',
        methods: [],
        props: [
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1631),
      };
    },
    1631: function(e, t, a) {
      var n = { react: a(0), './CoursesContainer.js': a(641) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst CoursesContainer$0 = require('./CoursesContainer.js');\nconst CoursesContainer = CoursesContainer$0.default || CoursesContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1632: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'CourseRedirectContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'location',
          },
        ],
        doclets: {},
        examples: a(1633),
      };
    },
    1633: function(e, t, a) {
      var n = { react: a(0), './CourseRedirectContainer.js': a(642) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst CourseRedirectContainer$0 = require('./CourseRedirectContainer.js');\nconst CourseRedirectContainer = CourseRedirectContainer$0.default || CourseRedirectContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1634: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AssessmentsContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'location',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1635),
      };
    },
    1635: function(e, t, a) {
      var n = { react: a(0), './AssessmentsContainer.js': a(643) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst AssessmentsContainer$0 = require('./AssessmentsContainer.js');\nconst AssessmentsContainer = AssessmentsContainer$0.default || AssessmentsContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1636: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AssessmentMetadata',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'className',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1647: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'AssessmentSubmission',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1648: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Feedback',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1649: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Assessment',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1650: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Question',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'number' },
            required: !0,
            description: '',
            tags: {},
            name: 'questionNum',
          },
          {
            type: { name: 'func' },
            required: !0,
            description: '',
            tags: {},
            name: 'setAnswer',
          },
          {
            type: { name: 'string' },
            required: !0,
            description: '',
            tags: {},
            name: 'submissionType',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
          {
            type: { name: 'any' },
            required: !1,
            description: '',
            tags: {},
            name: 'answer',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'mcEmail',
          },
          {
            type: { name: 'string' },
            required: !1,
            description: '',
            tags: {},
            name: 'questionText',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'readOnly',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1651: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'StatusMsg',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'isXs',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1652: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'JobsContainer',
        methods: [],
        props: [
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'location',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1653),
      };
    },
    1653: function(e, t, a) {
      var n = { react: a(0), './JobsContainer.js': a(649) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst JobsContainer$0 = require('./JobsContainer.js');\nconst JobsContainer = JobsContainer$0.default || JobsContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1654: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Job',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1655: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'JobApply',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'func' },
            required: !0,
            description: '',
            tags: {},
            name: 'onClick',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'big',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'loading',
          },
          {
            type: { name: 'array' },
            required: !1,
            description: '',
            tags: {},
            name: 'skillsNotAchieved',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1656: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'JobMetadata',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'isXs',
          },
          {
            type: { name: 'bool' },
            required: !1,
            description: '',
            tags: {},
            name: 'small',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1657: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SkillsCounter',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1658: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'DetailedViewContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'location',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1659),
      };
    },
    1659: function(e, t, a) {
      var n = { react: a(0), './DetailedViewContainer.js': a(653) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst DetailedViewContainer$0 = require('./DetailedViewContainer.js');\nconst DetailedViewContainer = DetailedViewContainer$0.default || DetailedViewContainer$0;",
        r
      ),
        (e.exports = [
          {
            type: 'markdown',
            content:
              'Based on the route, renders either [`Job`](#job) or [`Assessment`](#assessment).\nIf job or assessment ID not found, renders [`FourOhFour`](#fourohfour).',
          },
        ]);
    },
    1660: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ProfileContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'theme',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: a(1661),
      };
    },
    1661: function(e, t, a) {
      var n = { react: a(0), './ProfileContainer.js': a(155) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst ProfileContainer$0 = require('./ProfileContainer.js');\nconst ProfileContainer = ProfileContainer$0.default || ProfileContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1662: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'Profile',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'user',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1663: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ProfileAssessments',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'array' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1664: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ProfileCourses',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'history',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'array' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1665: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'ProfileResume',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
          {
            type: { name: 'bool' },
            required: !0,
            description: '',
            tags: {},
            name: 'isMobile',
          },
          {
            type: { name: 'object' },
            required: !1,
            description: '',
            tags: {},
            name: 'data',
          },
        ],
        doclets: {},
        examples: null,
      };
    },
    1666: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'SchedulerContainer',
        methods: [],
        props: [
          {
            type: { name: 'object' },
            required: !0,
            description: '',
            tags: {},
            name: 'classes',
          },
        ],
        doclets: {},
        examples: a(1667),
      };
    },
    1667: function(e, t, a) {
      var n = { react: a(0), './SchedulerContainer.js': a(650) },
        r = a(85).default.bind(null, n);
      a(86).default.bind(
        null,
        "const React$0 = require('react');\nconst React = React$0.default || React$0;\nconst SchedulerContainer$0 = require('./SchedulerContainer.js');\nconst SchedulerContainer = SchedulerContainer$0.default || SchedulerContainer$0;",
        r
      ),
        (e.exports = []);
    },
    1668: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'DateSelector',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1669: function(e, t, a) {
      e.exports = {
        description: '',
        displayName: 'TimeSelector',
        methods: [],
        doclets: {},
        examples: null,
      };
    },
    1672: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(17),
        i = a(0),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(11),
        u = a(9),
        d = a(117),
        m = a(36),
        p = a(719),
        g = a.n(p),
        h = a(186),
        f = a.n(h),
        b = a(63),
        E = a.n(b),
        y = a(100),
        v = a(70),
        x = a.n(v),
        j = a(272),
        S = a(499),
        N = a(278),
        k = a(5),
        O = a(13),
        w = a(21),
        C = function(e) {
          var t = Object(i.useState)('\u2013'),
            a = Object(n.a)(t, 2),
            r = a[0],
            o = a[1];
          Object(i.useEffect)(function() {
            s(e);
          }, []);
          var s = function(e) {
            Object(w.b)(
              w.a.CACHED_STATS,
              { filters: e.filters, collection: e.collection },
              function(e) {
                o(e.data.value);
              },
              function(e) {
                return console.log('fail', e);
              }
            );
          };
          return r;
        };
      t.default = c()(
        function(e) {
          return {
            root: Object(r.a)(
              {
                margin: '0 auto',
                marginTop: 2 * -e.spacing(1),
                marginBottom: e.spacing(3),
                padding: e.spacing(1),
                boxSizing: 'border-box',
              },
              e.breakpoints.down('sm'),
              {
                width: 'calc(100% - '.concat(e.spacing(2), 'px) !important'),
                maxWidth: 660,
              }
            ),
            milestonesIcon: {
              fontSize: 32,
              opacity: 0.87,
              marginRight: e.spacing(1.5),
            },
            title: { fontWeight: 500 },
            iconButton: { marginRight: -e.spacing(1) },
            milestonesGrid: {
              marginTop: e.spacing(1),
              padding: e.spacing(0.5),
            },
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.classes,
          a = e.theme,
          r = e.width,
          s = e.user,
          c = e.isMobile,
          p = Object(i.useState)(!1),
          h = Object(n.a)(p, 2),
          b = h[0],
          v = h[1],
          w = Object(N.a)(a.breakpoints.down('xs')),
          T = C({
            collection: ''
              .concat(k.COLLECTIONS.users, '/')
              .concat(s.id, '/')
              .concat(k.COLLECTIONS.courses),
            filters: [{ property: 'completed', operation: '==', value: !0 }],
          });
        return o.a.createElement(
          'div',
          { className: t.root, style: { width: r } },
          o.a.createElement(
            l.a,
            { container: !0, alignItems: 'center' },
            o.a.createElement(g.a, { className: t.milestonesIcon }),
            o.a.createElement(
              l.a,
              { item: !0, xs: !0 },
              o.a.createElement(
                u.a,
                { variant: 'h5', className: t.title },
                'Your Milestones'
              )
            ),
            w
              ? o.a.createElement(
                  d.a,
                  {
                    color: 'primary',
                    onClick: function() {
                      v(!0);
                    },
                    className: t.iconButton,
                  },
                  o.a.createElement(f.a, null)
                )
              : o.a.createElement(
                  m.a,
                  {
                    color: 'primary',
                    variant: 'outlined',
                    onClick: function() {
                      v(!0);
                    },
                  },
                  'Activity Log',
                  o.a.createElement(f.a, null)
                )
          ),
          o.a.createElement(
            l.a,
            { container: !0, spacing: 1, className: t.milestonesGrid },
            o.a.createElement(
              l.a,
              { item: !0, xs: 4, sm: 3 },
              o.a.createElement(j.default, {
                val: Array.isArray(s.touchedJobs) ? s.touchedJobs.length : 0,
                Icon: E.a,
                title: 'Jobs\napplied',
                route: O.i,
                isXs: w,
              })
            ),
            o.a.createElement(
              l.a,
              { item: !0, xs: 4, sm: 3 },
              o.a.createElement(j.default, {
                val: Array.isArray(s.skills) ? s.skills.length : 0,
                Icon: y.a,
                title: 'Skills\nachieved',
                route: O.b,
                isXs: w,
              })
            ),
            o.a.createElement(
              l.a,
              { item: !0, xs: 4, sm: 3 },
              o.a.createElement(j.default, {
                val: isNaN(T) ? 0 : T,
                Icon: x.a,
                title: 'Courses\ncompleted',
                route: O.c,
                isXs: w,
              })
            )
          ),
          b &&
            s &&
            o.a.createElement(S.default, {
              showDialog: b,
              setShowDialog: v,
              user: s,
              isMobile: c,
            })
        );
      });
    },
    178: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(191),
        c = a(345),
        l = a.n(c),
        u = a(346),
        d = a(280),
        m = a(458),
        p = a(731),
        g = a(683),
        h = a.n(g);
      function f(e) {
        var t = e.classes,
          a = e.width,
          n = e.height,
          i = e.isLoading,
          o = e.logoClass,
          c = e.snackBar;
        return (
          Object(u.a)('#FA5E4E', h.a, !1),
          r.a.createElement(
            'div',
            { className: t.root },
            r.a.createElement(
              p.a,
              { direction: 'up', in: !0 },
              r.a.createElement(
                'div',
                { className: t.middle },
                r.a.createElement(
                  s.a,
                  {
                    className: t.paper,
                    style: { width: a, height: n },
                    elevation: 15,
                  },
                  r.a.createElement(d.a, {
                    className: t.loading,
                    style: i ? {} : { display: 'none' },
                  }),
                  r.a.createElement('img', {
                    className: t[o] || t.centeredLogo,
                    alt: 'dark2hatsLogo',
                    src: l.a,
                  }),
                  e.children
                )
              )
            ),
            r.a.createElement(m.default, { data: c })
          )
        );
      }
      (f.defaultProps = { width: 320, height: 500 }),
        (t.default = o()(
          function(e) {
            return {
              root: { height: '100%', width: '100%' },
              middle: {},
              logo: {
                paddingTop: 40,
                marginBottom: 30,
                marginLeft: 75,
                width: 200,
                height: 69,
              },
              centeredLogo: {
                marginTop: 40,
                marginBottom: 30,
                marginLeft: 'auto',
                marginRight: 'auto',
                display: 'block',
                width: 117,
                height: 42,
              },
              miniLogo: {
                marginTop: 40,
                marginBottom: 20,
                marginLeft: 45,
                width: 117,
                height: 42,
              },
              paper: {
                overflowY: 'visible',
                overflowX: 'hidden',
                position: 'relative',
              },
              loading: { position: 'absolute', top: 0, width: '100%' },
            };
          },
          { withTheme: !0 }
        )(f));
    },
    179: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(11),
        c = a(9),
        l = a(219),
        u = a.n(l),
        d = a(5);
      t.default = o()(function(e) {
        return {
          industryWrapper: {
            width: 'auto',
            marginTop: -e.spacing(1) / 4,
            marginBottom: e.spacing(1),
          },
          industryIcon: {
            marginRight: e.spacing(0.5),
            color: e.palette.text.secondary,
          },
          industryText: { fontWeight: 500, color: e.palette.text.secondary },
        };
      })(function(e) {
        var t = e.classes,
          a = e.value;
        return r.a.createElement(
          s.a,
          { container: !0, alignItems: 'center', className: t.industryWrapper },
          r.a.createElement(
            s.a,
            { item: !0 },
            r.a.createElement(u.a, { className: t.industryIcon })
          ),
          r.a.createElement(
            s.a,
            { item: !0, xs: !0 },
            r.a.createElement(
              c.a,
              { variant: 'body1', className: t.industryText },
              Object(d.getAssessmentCategoryLabel)(a)
            )
          )
        );
      });
    },
    180: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(16),
        s = a.n(o),
        c = a(64),
        l = a(7),
        u = a.n(l),
        d = a(36),
        m = a(715),
        p = a.n(m);
      t.default = Object(c.a)(
        u()(function(e) {
          return {
            root: Object(n.a)({}, e.breakpoints.up('lg'), {
              position: 'relative',
            }),
            backIcon: { margin: '0 !important' },
          };
        })(function(e) {
          var t = e.classes,
            a = e.className,
            n = e.history;
          return i.a.createElement(
            d.a,
            {
              id: 'back',
              onClick: function() {
                n.goBack();
              },
              color: 'primary',
              className: s()(t.root, a),
            },
            i.a.createElement(p.a, { className: t.backIcon }),
            'Back'
          );
        })
      );
    },
    181: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(30),
        c = a(53),
        l = a(0),
        u = a.n(l),
        d = a(7),
        m = a.n(d),
        p = a(36),
        g = a(268),
        h = a(684),
        f = a.n(h),
        b = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(
                this,
                Object(o.a)(t).call(this, e)
              )).signIn = a.signIn.bind(Object(s.a)(a))),
              (a.enableButton = a.enableButton.bind(Object(s.a)(a))),
              (a.state = { disabled: !0 }),
              a
            );
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentDidMount',
                value: function() {
                  var e,
                    t,
                    a,
                    n,
                    r,
                    i = this,
                    o = this.props,
                    s = o.clientId,
                    c = o.cookiePolicy,
                    l = o.loginHint,
                    u = o.hostedDomain,
                    d = o.autoLoad,
                    m = o.isSignedIn,
                    p = o.fetchBasicProfile,
                    g = o.redirectUri,
                    h = o.discoveryDocs,
                    f = o.onFailure,
                    b = o.uxMode,
                    E = o.scope,
                    y = o.accessType,
                    v = o.responseType,
                    x = o.jsSrc;
                  (t = 'script'),
                    (n = a = (e = document).getElementsByTagName(t)[0]),
                    (r = a),
                    ((r = e.createElement(t)).id = 'google-login'),
                    (r.src = x),
                    n && n.parentNode
                      ? n.parentNode.insertBefore(r, n)
                      : e.head.appendChild(r),
                    (r.onload = function() {
                      var e = {
                        client_id: s,
                        cookie_policy: c,
                        login_hint: l,
                        hosted_domain: u,
                        fetch_basic_profile: p,
                        discoveryDocs: h,
                        ux_mode: b,
                        redirect_uri: g,
                        scope: E,
                        access_type: y,
                      };
                      'code' === v && (e.access_type = 'offline'),
                        window.gapi.load('auth2', function() {
                          i.enableButton(),
                            window.gapi.auth2.getAuthInstance() ||
                              window.gapi.auth2.init(e).then(
                                function(e) {
                                  m &&
                                    e.isSignedIn.get() &&
                                    i.handleSigninSuccess(e.currentUser.get());
                                },
                                function(e) {
                                  return f(e);
                                }
                              ),
                            d && i.signIn();
                        });
                    });
                },
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  this.enableButton = function() {};
                },
              },
              {
                key: 'enableButton',
                value: function() {
                  this.setState({ disabled: !1 });
                },
              },
              {
                key: 'signIn',
                value: function(e) {
                  var t = this;
                  if ((e && e.preventDefault(), !this.state.disabled)) {
                    var a = window.gapi.auth2.getAuthInstance(),
                      n = this.props,
                      r = n.onSuccess,
                      i = n.onRequest,
                      o = n.onFailure,
                      s = n.prompt,
                      c = n.responseType,
                      l = { prompt: s };
                    i(),
                      'code' === c
                        ? a.grantOfflineAccess(l).then(
                            function(e) {
                              return r(e);
                            },
                            function(e) {
                              return o(e);
                            }
                          )
                        : a.signIn(l).then(
                            function(e) {
                              return t.handleSigninSuccess(e);
                            },
                            function(e) {
                              return o(e);
                            }
                          );
                  }
                },
              },
              {
                key: 'handleSigninSuccess',
                value: function(e) {
                  var t = e.getBasicProfile(),
                    a = e.getAuthResponse();
                  (e.googleId = t.getId()),
                    (e.tokenObj = a),
                    (e.tokenId = a.id_token),
                    (e.accessToken = a.access_token),
                    (e.profileObj = {
                      googleId: t.getId(),
                      imageUrl: t.getImageUrl(),
                      email: t.getEmail(),
                      name: t.getName(),
                      givenName: t.getGivenName(),
                      familyName: t.getFamilyName(),
                    }),
                    this.props.onSuccess(e);
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.tag,
                    a = e.type,
                    n = e.style,
                    r = e.className,
                    i = e.disabledStyle,
                    o = e.buttonText,
                    s = e.children,
                    c = e.render,
                    l = this.state.disabled || this.props.disabled;
                  if (c) return c({ onClick: this.signIn });
                  var d =
                      n ||
                      (r && !n
                        ? {}
                        : {
                            display: 'inline-block',
                            background: '#d14836',
                            color: '#fff',
                            width: 190,
                            paddingTop: 10,
                            paddingBottom: 10,
                            borderRadius: 2,
                            border: '1px solid transparent',
                            fontSize: 16,
                            fontWeight: 'bold',
                            fontFamily: 'Roboto',
                          }),
                    m = l ? Object.assign({}, d, i) : d;
                  return u.a.createElement(
                    t,
                    {
                      onClick: this.signIn,
                      style: m,
                      type: a,
                      disabled: l,
                      className: r,
                    },
                    s || o
                  );
                },
              },
            ]),
            t
          );
        })(l.Component);
      b.defaultProps = {
        type: 'button',
        tag: 'button',
        buttonText: 'Login with Google',
        scope: 'profile email',
        accessType: 'online',
        prompt: '',
        cookiePolicy: 'single_host_origin',
        fetchBasicProfile: !0,
        isSignedIn: !1,
        uxMode: 'popup',
        disabledStyle: { opacity: 0.6 },
        onRequest: function() {},
        jsSrc: 'https://apis.google.com/js/client:platform.js',
      };
      var E = b,
        y = a(353),
        v = a(64),
        x = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(
                this,
                Object(o.a)(t).call(this, e)
              )).handleGoogleAuthFail = function(e) {
                console.log('google auth fail', e);
              }),
              (a.handleGoogleAuthFail = a.handleGoogleAuthFail.bind(
                Object(s.a)(a)
              )),
              (a.handleRouting = a.handleRouting.bind(Object(s.a)(a))),
              (a.getToken = a.getToken.bind(Object(s.a)(a))),
              (a.state = { cid: g.b }),
              a
            );
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentWillMount',
                value: function() {
                  this.setState({ cid: g.a });
                },
              },
              {
                key: 'handleRouting',
                value: function(e) {
                  this.props.changeHandler('isLoading', !1),
                    this.props.history.replace(e);
                },
              },
              {
                key: 'getToken',
                value: function(e) {
                  this.props.changeHandler('isLoading', !0), console.log(e);
                  var t = {};
                  (t.jwtToken = e.tokenId), Object(y.a)(t, this.handleRouting);
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.classes,
                    a = e.action,
                    n = this.state.cid;
                  return u.a.createElement(E, {
                    key: 'google-button',
                    clientId: n,
                    buttonText: 'Login',
                    onSuccess: this.getToken,
                    onFailure: this.handleGoogleAuthFail,
                    render: function(e) {
                      return u.a.createElement(
                        p.a,
                        {
                          variant: 'contained',
                          key: 'google-button',
                          id: 'google-button',
                          style: { backgroundColor: '#4285F4' },
                          onClick: e.onClick,
                          className: t.socialButton,
                        },
                        u.a.createElement('img', {
                          alt: 'google-logo',
                          src: f.a,
                          className: t.socialIcon,
                        }),
                        a || 'Sign in',
                        ' with Google'
                      );
                    },
                  });
                },
              },
            ]),
            t
          );
        })(l.Component);
      t.default = Object(v.a)(
        m()(function(e) {
          return {
            root: { paddingLeft: 50, paddingRight: 50, height: 500 },
            socialButton: {
              margin: 5,
              width: 250,
              height: 40,
              color: '#fff',
              padding: 0,
              paddingLeft: 20,
            },
            socialIcon: {
              marginRight: 16,
              position: 'absolute',
              left: 6,
              top: 6,
            },
          };
        })(x)
      );
    },
    21: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return r;
      }),
        a.d(t, 'b', function() {
          return i;
        });
      var n = a(33),
        r = {
          TAG_TRACKER: 'callablesEventTracker',
          RESUME_SCRAPER: 'callablesAlgoliaResumes',
          SPEEDY_SIGNUP: 'callablesAuthSpeedySignup',
          AUTHENTICATE_GOOGLE: 'callablesAuthGoogle',
          AUTHENTICATE_LINKEDIN: 'callablesAuthenticateLinkedIn',
          CHECK_EMAIL: 'callablesCheckEmail',
          SMART_LINK: 'callablesSmartLinkActivate',
          RESET_PASSWORD: 'callablesAuthResetPassword',
          CREATE_PASSWORD: 'callablesAuthCreatePassword',
          DISABLE_SMART_LINK: 'callablesSmartLinkDisable',
          LEARN_WORLD_SSO: 'callablesLearnWorldSignon',
          CHARGE_STRIPE_TOKEN: 'callablesStripeChargeToken',
          LW_SINGLE_SIGN_ON: 'callablesLearnWorldSignon',
          WHATS_NEXT_AI: 'callablesWhatsNextAI',
          CREATE_SMART_LINK: 'callablesSmartLinkCreate',
          CHECK_FREE_TIMESLOTS: 'callablesCalendarFreeTimeslots',
          CACHED_STATS: 'callablesCachedStats',
        },
        i = function(e, t, a, r) {
          n.d
            .httpsCallable(e)(t)
            .then(function(e) {
              a && a(e);
            })
            .catch(function(e) {
              r && r(e);
            });
        };
    },
    216: function(e, t, a) {
      e.exports = a.p + 'static/media/Black.f856a8d1.svg';
    },
    222: function(e, t, a) {
      'use strict';
      a.d(t, 'b', function() {
        return p;
      }),
        a.d(t, 'c', function() {
          return g;
        }),
        a.d(t, 'a', function() {
          return h;
        });
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(14),
        s = a(106),
        c = a(89),
        l = a(45),
        u = a(21),
        d = a(5),
        m = a(13),
        p = function(e, t, a, n) {
          console.log('Copying assessment\u2026', e);
          var r = e.id,
            i = Object(s.a)(e, ['id']),
            p = Object(o.a)({}, i, {
              UID: t.id,
              outcome: 'pending',
              screened: !1,
              submissionContent: [],
              assessmentId: e.assessmentId || r,
              submitted: !1,
              smartLink: {},
            });
          if (
            e.questionsDisplayed > 0 &&
            e.questions &&
            e.questions.length > 0
          ) {
            for (var g = [], h = []; g.length < e.questionsDisplayed; ) {
              var f = Math.floor(Math.random() * e.questions.length);
              h.includes(f) || (h.push(f), g.push(e.questions[f]));
            }
            (p.copiedQuestions = g), (p.copiedQuestionsIndices = h);
          }
          'mailchimp' === e.submissionType &&
            (p.mcEmail = 'mc+'.concat(Object(c.d)(), '@2hats.com')),
            Object(l.a)(
              ''
                .concat(d.COLLECTIONS.users, '/')
                .concat(t.id, '/')
                .concat(d.COLLECTIONS.assessments),
              p
            ).then(function(r) {
              console.log('Created submission doc', r.id),
                'ideo' === e.submissionType &&
                  Object(u.b)(
                    u.a.CREATE_SMART_LINK,
                    { route: 'ideo', data: { submissionId: r.id } },
                    function(e) {
                      r.update({ smartLink: e.data });
                    },
                    function(e) {
                      console.error('error creating smartlink', e);
                    }
                  ),
                n
                  ? (Object(l.d)(
                      ''
                        .concat(d.COLLECTIONS.users, '/')
                        .concat(t.id, '/')
                        .concat(d.COLLECTIONS.assessments),
                      n,
                      { resubmitted: r.id }
                    ).then(function(e) {
                      console.log('resubmitted set to true for', e);
                    }),
                    a.push(''.concat(m.a, '?id=').concat(r.id, '&yours=true')))
                  : a.replace(
                      ''.concat(m.a, '?id=').concat(r.id, '&yours=true')
                    );
              var i = t.touchedAssessments || [];
              i.push(e.assessmentId || e.id),
                Object(l.d)(d.COLLECTIONS.users, t.id, {
                  touchedAssessments: i,
                });
            });
        },
        g = (function() {
          var e = Object(i.a)(
            r.a.mark(function e(t, a, n) {
              var i;
              return r.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        Object(l.b)(d.COLLECTIONS.assessments, t.assessmentId)
                      );
                    case 2:
                      (i = e.sent), p(i, a, n, t.id);
                    case 4:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t, a, n) {
            return e.apply(this, arguments);
          };
        })(),
        h = function(e, t) {
          'ideo' === e.submissionType &&
            e.smartLink &&
            e.smartLink.key &&
            e.smartLink.secret &&
            (console.log('Checking SmartLink\u2026', e.smartLink),
            Object(u.b)(
              u.a.SMART_LINK,
              { slKey: e.smartLink.key, slSecret: e.smartLink.secret },
              function(a) {
                console.log('smartlink response', a.data),
                  (a.data.success &&
                    'ideo' === a.data.route &&
                    a.data.doc.data.submissionId === e.id) ||
                    (console.log('Re-generating SmartLink\u2026'),
                    Object(u.b)(
                      u.a.CREATE_SMART_LINK,
                      { route: 'ideo', data: { submissionId: e.id } },
                      function(a) {
                        Object(l.d)(
                          ''
                            .concat(d.COLLECTIONS.users, '/')
                            .concat(t.id, '/')
                            .concat(d.COLLECTIONS.assessments),
                          e.id,
                          { smartLink: a.data }
                        ).then(function() {
                          console.log('Successfully re-generated SmartLink');
                        });
                      },
                      function(e) {
                        console.error('error creating smartlink', e);
                      }
                    ));
              },
              function(e) {
                console.error('error checking smartlink', e);
              }
            ));
        };
    },
    223: function(e, t, a) {
      'use strict';
      var n = a(14),
        r = a(17),
        i = a(0),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(278),
        u = a(731),
        d = a(11),
        m = a(36),
        p = a(1721),
        g = a(1678),
        h = a(1682),
        f = a(1679),
        b = a(1680),
        E = a(727),
        y = a(37),
        v = a(730),
        x = a(507),
        j = a(25),
        S = a(282),
        N = function(e) {
          var t = e.label,
            a = e.name,
            n = e.placeholder,
            r = e.formikProps,
            i = e.autoFocus,
            s = r.handleChange,
            c = r.values,
            l = r.errors,
            u = r.touched;
          return o.a.createElement(
            d.a,
            { item: !0, key: a },
            o.a.createElement(S.a, {
              placeholder: n,
              multiline: !0,
              rows: 5,
              fullWidth: !0,
              label: t,
              id: a,
              onChange: s,
              value: c[a],
              variant: 'filled',
              margin: 'dense',
              InputProps: { disableUnderline: !0 },
              error: !(!l[a] || !u[a]),
              helperText: u[a] && l[a],
              autoFocus: i,
            })
          );
        },
        k = function(e) {
          var t = e.label,
            a = e.name,
            i = e.type,
            s = e.placeholder,
            c = e.formikProps,
            l = e.width,
            u = e.autoFocus,
            m = e.disallowSpace,
            p = c.handleChange,
            g = c.values,
            h = c.errors,
            f = c.touched,
            b = c.setValues,
            E = 'text';
          switch (i) {
            case j.a.textFieldNumber:
              E = 'number';
              break;
            case j.a.textFieldPassword:
              E = 'password';
              break;
            case j.a.textFieldEmail:
              E = 'email';
              break;
            case j.a.textFieldTel:
              E = 'tel';
          }
          return o.a.createElement(
            d.a,
            { item: !0, xs: l || 12 },
            i === j.a.textFieldMultiline
              ? o.a.createElement(N, {
                  type: i,
                  formikProps: c,
                  label: t,
                  name: a,
                  placeholder: s,
                  autoFocus: u,
                })
              : o.a.createElement(S.a, {
                  label: t,
                  id: a,
                  type: E,
                  onChange: m
                    ? function(e) {
                        b(
                          Object(n.a)(
                            {},
                            g,
                            Object(r.a)({}, a, e.target.value.replace(' ', ''))
                          )
                        );
                      }
                    : p,
                  variant: 'filled',
                  margin: 'dense',
                  InputProps: { disableUnderline: !0 },
                  fullWidth: !0,
                  value: g[a],
                  placeholder: s,
                  error: !(!h[a] || !f[a]),
                  helperText: f[a] && h[a],
                  autoFocus: u,
                })
          );
        },
        O = a(1677),
        w = a(117),
        C = a(511),
        T = a(270),
        _ = a.n(T),
        L = c()(function(e) {
          return {
            sliderSectionWrapper: { margin: ''.concat(e.spacing(1), 'px 0') },
            sliderWrapper: { marginRight: e.spacing(3) },
            textFieldWithAdornment: { paddingRight: 0 },
            chipsWrapper: { marginTop: -e.spacing(1) / 2 },
            chip: { marginTop: e.spacing(0.5) },
          };
        })(function(e) {
          var t = e.label,
            a = e.name,
            n = e.handleDeleteFromList,
            r = e.formikProps,
            i = e.classes,
            s = e.handleAddToList,
            c = r.values,
            l = r.errors,
            u = r.touched,
            m = r.handleChange;
          return o.a.createElement(
            d.a,
            { item: !0, xs: 12, className: i.sliderSectionWrapper },
            o.a.createElement(S.a, {
              id: ''.concat(a, '-temp'),
              type: 'text',
              onChange: m,
              variant: 'filled',
              margin: 'dense',
              fullWidth: !0,
              value: c[''.concat(a, '-temp')] || '',
              label: t,
              onKeyPress: function(e) {
                'Enter' === e.key && s(a, ''.concat(a, '-temp'));
              },
              error: !(!l[a] || !u[a]),
              helperText: u[a] && l[a],
              InputProps: {
                disableUnderline: !0,
                endAdornment: o.a.createElement(
                  O.a,
                  { position: 'end' },
                  o.a.createElement(
                    w.a,
                    {
                      onClick: function() {
                        s(a, ''.concat(a, '-temp'));
                      },
                    },
                    o.a.createElement(_.a, { fontSize: 'small' })
                  )
                ),
                classes: { adornedEnd: i.textFieldWithAdornment },
              },
            }),
            o.a.createElement(
              'div',
              { className: i.chipsWrapper },
              c[a] &&
                c[a].map(function(e, t) {
                  return o.a.createElement(C.a, {
                    key: t,
                    label: e,
                    className: i.chip,
                    onDelete: function() {
                      n(a, t);
                    },
                  });
                })
            )
          );
        }),
        I = a(9),
        A = a(1723),
        R = c()(function(e) {
          return {
            sliderSectionWrapper: { margin: ''.concat(e.spacing(1), 'px 0') },
            sliderGrid: { paddingRight: e.spacing(1) },
            sliderWrapper: { marginRight: e.spacing(2) },
            slider: { marginLeft: e.spacing(1) },
            sectionTitle: { marginLeft: e.spacing(1.5) },
            thumb: {
              width: e.spacing(1.5),
              height: e.spacing(1.5),
              borderRadius: '50%',
              backgroundColor: e.palette.primary.main,
            },
            thumbLabel: {
              transition: e.transitions.create('transform', {
                duration: e.transitions.duration.shortest,
              }),
              transform: 'scale(0)',
              transformOrigin: '0 100%',
              position: 'absolute',
              top: 5 * -e.spacing(1),
              left: e.spacing(0.75),
              padding: ''
                .concat(e.spacing(0.5), 'px ')
                .concat(e.spacing(1), 'px'),
              backgroundColor: e.palette.primary.main,
              color: e.palette.primary.contrastText,
              borderRadius: e.spacing(1.5),
              borderBottomLeftRadius: 2,
              fontWeight: 500,
              fontFamily: e.typography.fontFamily,
              '$thumb:active &, $thumb:focus &': { transform: 'scale(1)' },
            },
          };
        })(function(e) {
          var t = e.label,
            a = e.name,
            i = e.min,
            s = e.max,
            c = e.calcValueLabel,
            l = e.sliderThumbLabel,
            u = e.step,
            m = e.units,
            p = e.formikProps,
            g = e.classes,
            h = e.validator,
            f = p.setValues,
            b = p.values,
            E = p.errors,
            y = p.touched,
            v = ''.concat(u < 0.999 ? b[a].toFixed(1) : b[a], ' ').concat(m);
          return (
            c && (v = c(b[a])),
            o.a.createElement(
              d.a,
              { item: !0, xs: 12, className: g.sliderSectionWrapper },
              o.a.createElement(
                I.a,
                {
                  variant: 'caption',
                  className: g.sectionTitle,
                  color: E[a] && y[a] ? 'error' : 'textSecondary',
                },
                t
              ),
              o.a.createElement(
                d.a,
                {
                  container: !0,
                  alignItems: 'center',
                  className: g.sliderGrid,
                },
                o.a.createElement(
                  d.a,
                  { item: !0, xs: !0, className: g.sliderWrapper },
                  o.a.createElement(A.a, {
                    classes: { container: g.slider },
                    onChange: function(e, t) {
                      f(Object(n.a)({}, b, Object(r.a)({}, a, t)));
                    },
                    id: a,
                    value: b[a],
                    min: i,
                    max: s,
                    step: u,
                    thumb: o.a.createElement(
                      'div',
                      { className: g.thumb },
                      o.a.createElement(
                        I.a,
                        { variant: 'body1', className: g.thumbLabel },
                        b[a],
                        l
                      )
                    ),
                  })
                ),
                o.a.createElement(
                  d.a,
                  { item: !0 },
                  o.a.createElement(I.a, { variant: 'subtitle1' }, v)
                )
              ),
              ' ',
              h(a)
            )
          );
        }),
        P = a(275),
        B = a(698),
        W = a(5),
        D = a(31),
        q = a.n(D),
        M = c()(function(e) {
          return { dateTimePicker: { marginRight: e.spacing(1) } };
        })(function(e) {
          var t = e.label,
            a = e.name,
            i = e.formikProps,
            s = e.classes,
            c = e.validator,
            l = e.type,
            u = e.width,
            m = i.setValues,
            p = i.values,
            g = i.errors,
            h = i.touched;
          return o.a.createElement(
            d.a,
            { item: !0, xs: u || 12 },
            o.a.createElement(
              P.c,
              { utils: B.a },
              l === j.a.dateTime
                ? o.a.createElement(P.b, {
                    label: t,
                    value: p[a] ? q()(p[a], W.MOMENT_FORMATS.dateTime) : null,
                    onChange: function(e) {
                      m(
                        Object(n.a)(
                          {},
                          p,
                          Object(r.a)(
                            {},
                            a,
                            e.format(W.MOMENT_FORMATS.dateTime)
                          )
                        )
                      );
                    },
                    format: W.MOMENT_FORMATS.dateTime,
                    showTodayButton: !0,
                    className: s.dateTimePicker,
                    variant: 'filled',
                    margin: 'dense',
                    fullWidth: !0,
                    InputProps: { disableUnderline: !0 },
                    error: !(!g[a] || !h[a]),
                  })
                : o.a.createElement(P.a, {
                    label: t,
                    value: p[a] ? q()(p[a], W.MOMENT_FORMATS.date) : null,
                    onChange: function(e) {
                      m(
                        Object(n.a)(
                          {},
                          p,
                          Object(r.a)({}, a, e.format(W.MOMENT_FORMATS.date))
                        )
                      );
                    },
                    format: W.MOMENT_FORMATS.date,
                    showTodayButton: !0,
                    className: s.dateTimePicker,
                    variant: 'filled',
                    margin: 'dense',
                    fullWidth: !0,
                    InputProps: { disableUnderline: !0 },
                    error: !(!g[a] || !h[a]),
                  })
            ),
            c(a)
          );
        }),
        H = a(12),
        F = a(16),
        U = a.n(F),
        z = a(279),
        G = a(156),
        $ = a.n(G),
        Y = a(157),
        V = a.n(Y),
        X = a(161),
        K = a(160),
        J = a(382),
        Z = c()(function(e) {
          return Object(
            n.a
          )({ sectionTitle: { marginLeft: e.spacing(1.5) } }, W.STYLES.DROPZONE(e));
        })(function(e) {
          var t = e.label,
            a = e.name,
            s = e.mimeTypes,
            c = e.path,
            l = e.formikProps,
            u = e.classes,
            g = l.setValues,
            h = l.values,
            f = l.errors,
            b = l.touched,
            E = Object(i.useState)(null),
            y = Object(H.a)(E, 2),
            v = y[0],
            x = y[1];
          Object(i.useEffect)(
            function() {
              v &&
                g(
                  Object(n.a)(
                    {},
                    h,
                    Object(r.a)({}, a, { name: h[a].name, url: v })
                  )
                );
            },
            [v]
          );
          var j = Object(i.useState)(''),
            S = Object(H.a)(j, 2),
            N = S[0],
            k = S[1];
          return o.a.createElement(
            d.a,
            { item: !0, xs: 12 },
            o.a.createElement(
              I.a,
              {
                variant: 'caption',
                className: u.sectionTitle,
                color: f[a] && b[a] ? 'error' : 'textSecondary',
              },
              t
            ),
            o.a.createElement(
              K.a,
              {
                onDrop: function(e, t) {
                  console.log('dropzone', e, t),
                    t.length > 0 && k(t[0].name),
                    e.length > 0 &&
                      (g(
                        Object(n.a)(
                          {},
                          h,
                          Object(r.a)({}, a, { name: e[0].name })
                        )
                      ),
                      Object(X.b)(c, e[0], function(e, t) {
                        x(e);
                      }));
                },
                accept: s || '',
              },
              function(e) {
                var a = e.getRootProps,
                  n = e.getInputProps,
                  r = e.isDragActive;
                return o.a.createElement(
                  'div',
                  Object.assign({}, a(), {
                    className: U()(u.dropzone, r && u.dropzoneDragActive),
                  }),
                  o.a.createElement('input', n()),
                  o.a.createElement($.a, { className: u.uploadIcon }),
                  o.a.createElement(
                    I.a,
                    { variant: 'body1' },
                    r ? 'Drop your file here!' : 'Drag a file here or'
                  ),
                  o.a.createElement(
                    m.a,
                    {
                      color: 'primary',
                      variant: 'outlined',
                      className: u.dropzoneButton,
                      size: 'small',
                    },
                    'Click to upload a ',
                    t.toLowerCase()
                  ),
                  N &&
                    o.a.createElement(
                      I.a,
                      { variant: 'body2', color: 'error' },
                      N,
                      ' is invalid'
                    )
                );
              }
            ),
            !Object(J.a)(h[a]) &&
              o.a.createElement(
                'div',
                { className: u.fileChipWrapper },
                o.a.createElement(C.a, {
                  component: 'a',
                  href: h[a].url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  label: h[a].name,
                  onDelete: h[a].url
                    ? function(e) {
                        e.preventDefault(),
                          g(Object(n.a)({}, h, Object(r.a)({}, a, null)));
                      }
                    : null,
                  className: u.fileChip,
                  icon: h[a].url
                    ? o.a.createElement(V.a, { className: u.fileIcon })
                    : o.a.createElement(z.a, { size: 32 }),
                })
              ),
            b[a] &&
              f[a] &&
              o.a.createElement(
                p.a,
                { error: !0, className: u.sectionTitle },
                'Required'
              )
          );
        }),
        Q = a(106),
        ee = a(705),
        te = a(703),
        ae = a.n(te),
        ne = a(1718),
        re = a(191),
        ie = a(165),
        oe = a(1725),
        se = a(504),
        ce = a.n(se),
        le = a(365),
        ue = a.n(le),
        de = a(1674),
        me = a(162);
      function pe(e) {
        var t = e.inputRef,
          a = Object(Q.a)(e, ['inputRef']);
        return o.a.createElement('div', Object.assign({ ref: t }, a));
      }
      var ge = {
          Control: function(e) {
            return o.a.createElement(
              S.a,
              Object.assign(
                {
                  fullWidth: !0,
                  variant: 'filled',
                  margin: 'dense',
                  InputProps: {
                    disableUnderline: !0,
                    inputComponent: pe,
                    inputProps: Object(n.a)(
                      {
                        className: U()(
                          e.selectProps.classes.input,
                          !e.selectProps.textFieldProps.label &&
                            e.selectProps.classes.collapseInput
                        ),
                        inputRef: e.innerRef,
                        children: e.children,
                      },
                      e.innerProps
                    ),
                  },
                },
                e.selectProps.textFieldProps
              )
            );
          },
          Menu: function(e) {
            return o.a.createElement(
              'div',
              { className: e.selectProps.classes.menuWrapper },
              o.a.createElement(
                de.a,
                { in: !0, style: { transformOrigin: '50% 0' } },
                o.a.createElement(
                  re.a,
                  Object.assign(
                    { className: e.selectProps.classes.paper, elevation: 2 },
                    e.innerProps
                  ),
                  e.children
                )
              )
            );
          },
          MultiValue: function(e) {
            return o.a.createElement(C.a, {
              tabIndex: -1,
              label: e.children,
              className: U()(
                e.selectProps.classes.chip,
                Object(r.a)({}, e.selectProps.classes.chipFocused, e.isFocused)
              ),
              onDelete: e.removeProps.onClick,
              deleteIcon: o.a.createElement(ce.a, e.removeProps),
              variant: 'outlined',
            });
          },
          NoOptionsMessage: function(e) {
            return o.a.createElement(
              I.a,
              Object.assign(
                {
                  color: 'textSecondary',
                  className: e.selectProps.classes.noOptionsMessage,
                },
                e.innerProps
              ),
              e.children
            );
          },
          Option: function(e) {
            return o.a.createElement(
              oe.a,
              Object.assign(
                {
                  buttonRef: e.innerRef,
                  selected: e.isFocused,
                  component: 'div',
                  style: {
                    fontWeight: e.isSelected ? 500 : 400,
                    position: 'static',
                  },
                },
                e.innerProps
              ),
              e.data.avatarURL &&
                o.a.createElement(ie.a, { scr: e.data.avatarURL }, ' '),
              e.children
            );
          },
          Placeholder: function(e) {
            return o.a.createElement(
              I.a,
              Object.assign(
                {
                  color: 'textSecondary',
                  className: e.selectProps.classes.placeholder,
                },
                e.innerProps
              ),
              e.children
            );
          },
          SingleValue: function(e) {
            return o.a.createElement(
              I.a,
              Object.assign(
                { className: e.selectProps.classes.singleValue },
                e.innerProps
              ),
              e.children
            );
          },
          ValueContainer: function(e) {
            return o.a.createElement(
              'div',
              { className: e.selectProps.classes.valueContainer },
              e.children
            );
          },
          DropdownIndicator: function(e) {
            return o.a.createElement(
              w.a,
              { className: e.selectProps.classes.indicatorButton },
              o.a.createElement(ue.a, null)
            );
          },
          ClearIndicator: function(e) {
            return o.a.createElement(
              w.a,
              {
                onClick: e.clearValue,
                className: e.selectProps.classes.indicatorButton,
              },
              o.a.createElement(ce.a, null)
            );
          },
          IndicatorSeparator: null,
        },
        he = c()(
          function(e) {
            return {
              root: { flexGrow: 1 },
              input: {
                display: 'flex',
                paddingLeft: e.spacing(1.5),
                paddingRight: e.spacing(0.75),
              },
              collapseInput: { paddingTop: e.spacing(0.75) },
              valueContainer: {
                display: 'flex',
                flexWrap: 'wrap',
                flex: 1,
                alignItems: 'center',
                overflow: 'hidden',
                minHeight: e.spacing(3.5),
              },
              chip: {
                marginRight: ''.concat(e.spacing(0.5), 'px !important'),
                height: e.spacing(3.5),
                '& svg': { marginRight: e.spacing(0.25) },
              },
              chipFocused: {
                backgroundColor: Object(me.emphasize)(
                  'light' === e.palette.type
                    ? e.palette.grey[300]
                    : e.palette.grey[700],
                  0.08
                ),
              },
              noOptionsMessage: {
                padding: ''
                  .concat(e.spacing(1), 'px ')
                  .concat(e.spacing(2), 'px'),
              },
              singleValue: { fontSize: 16 },
              placeholder: {
                userSelect: 'none',
                fontSize: 16,
                position: 'absolute',
                left: e.spacing(1.5),
              },
              menuWrapper: { position: 'relative' },
              paper: {
                position: 'absolute',
                zIndex: 9,
                left: 0,
                right: 0,
                '& > div': { borderRadius: e.shape.borderRadius },
              },
              indicatorButton: { marginLeft: e.spacing(0.5), padding: 0 },
            };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.theme,
            r = e.placeholder,
            i = e.label,
            s = e.autoFocus,
            c = e.changeHandler,
            l = e.suggestions,
            u = e.value,
            d = e.isMulti,
            m = e.creatable,
            p = e.error,
            g = e.helperText,
            h = {
              input: function(e) {
                return Object(n.a)({}, e, {
                  color: a.palette.text.primary,
                  '& input': { font: 'inherit' },
                });
              },
            };
          return m
            ? o.a.createElement(
                'div',
                { className: t.root },
                o.a.createElement(
                  ne.a,
                  null,
                  o.a.createElement(ae.a, {
                    classes: t,
                    styles: h,
                    options: l,
                    components: ge,
                    onChange: c,
                    placeholder: r,
                    textFieldProps: {
                      label: i,
                      InputLabelProps: { shrink: !0 },
                      autoFocus: s,
                      error: p,
                      helperText: g,
                    },
                    value: u,
                    isMulti: d,
                  })
                )
              )
            : o.a.createElement(
                'div',
                { className: t.root },
                o.a.createElement(
                  ne.a,
                  null,
                  o.a.createElement(ee.a, {
                    classes: t,
                    styles: h,
                    options: l,
                    components: ge,
                    onChange: c,
                    placeholder: r,
                    textFieldProps: {
                      label: i,
                      InputLabelProps: { shrink: !0 },
                      autoFocus: s,
                      error: p,
                      helperText: g,
                    },
                    value: u,
                    isMulti: d,
                  })
                )
              );
        }),
        fe = function(e) {
          var t = e.label,
            a = e.name,
            i = e.type,
            s = e.placeholder,
            c = e.suggestions,
            l = e.formikProps,
            u = e.width,
            m = l.setValues,
            p = l.values,
            g = l.errors,
            h = l.touched;
          return o.a.createElement(
            d.a,
            { item: !0, xs: u || 12 },
            o.a.createElement(he, {
              placeholder:
                s || i.indexOf('MULTI') > -1
                  ? 'Select multiple items\u2026'
                  : 'Select item\u2026',
              suggestions: c,
              changeHandler: function(e) {
                m(Object(n.a)({}, p, Object(r.a)({}, a, e)));
              },
              value: p[a],
              label: t,
              isMulti: i.indexOf('MULTI') > -1,
              creatable: i.indexOf('FREE_TEXT') > -1,
              error: !(!g[a] || !h[a]),
              helperText: h[a] && ('object' == typeof g[a] ? g[a].value : g[a]),
            })
          );
        },
        be = a(1681),
        Ee = a(1726),
        ye = a(1732),
        ve = c()(function(e) {
          return {
            root: { paddingLeft: e.spacing(1) },
            validatorWrapper: {
              marginTop: 2 * -e.spacing(1),
              marginBottom: e.spacing(1.5),
              marginLeft: e.spacing(2.75),
            },
          };
        })(function(e) {
          var t = e.classes,
            a = e.label,
            n = e.name,
            r = e.formikProps,
            i = e.validator,
            s = e.width,
            c = r.handleChange,
            l = r.values;
          return o.a.createElement(
            d.a,
            { item: !0, xs: s || 12 },
            o.a.createElement(
              be.a,
              { className: t.root },
              o.a.createElement(Ee.a, {
                control: o.a.createElement(ye.a, {
                  checked: l[n],
                  onChange: c,
                  name: n,
                }),
                label: a,
              }),
              o.a.createElement('div', { className: t.validatorWrapper }, i(n))
            )
          );
        }),
        xe = a(1731),
        je = a(1727),
        Se = a(1676),
        Ne = c()(function(e) {
          return {
            root: { marginTop: e.spacing(0.5), marginBottom: -e.spacing(1) },
            sectionTitle: { marginLeft: e.spacing(1.5) },
            group: { marginLeft: e.spacing(1.25) },
            radioItem: { marginRight: e.spacing(4) },
            radio: { marginRight: -2 },
          };
        })(function(e) {
          var t = e.classes,
            a = e.label,
            n = e.name,
            r = e.options,
            i = e.horiz,
            s = e.formikProps,
            c = e.validator,
            l = s.handleChange,
            u = s.values,
            m = s.errors,
            p = s.touched;
          return o.a.createElement(
            d.a,
            { item: !0, xs: 12, className: t.root },
            o.a.createElement(
              Se.a,
              {
                component: 'fieldset',
                className: t.formControl,
                error: !(!m[n] || !p[n]),
              },
              o.a.createElement(
                I.a,
                {
                  variant: 'caption',
                  className: t.sectionTitle,
                  color: m[n] && p[n] ? 'error' : 'textSecondary',
                },
                a
              ),
              o.a.createElement(
                je.a,
                {
                  name: n,
                  className: t.group,
                  value: u[n],
                  onChange: l,
                  style: { flexDirection: i ? 'row' : 'column' },
                },
                r.map(function(e) {
                  return o.a.createElement(Ee.a, {
                    key: e.value,
                    value: e.value,
                    control: o.a.createElement(xe.a, {
                      className: t.radio,
                      id: e.value,
                    }),
                    label: e.label,
                    className: t.radioItem,
                  });
                })
              )
            ),
            o.a.createElement('div', { className: t.validatorWrapper }, c(n))
          );
        }),
        ke = function(e) {
          return Array.isArray(e)
            ? e[0] && e[0].label && e[0].value
              ? e.map(function(e) {
                  return e.value;
                })
              : e
            : e.label && e.value
            ? e.value
            : e;
        },
        Oe = function(e) {
          return 'string' == typeof e && e.includes('youtube.com')
            ? e.replace('watch?v=', 'embed/').split('&')[0]
            : e;
        },
        we = function(e, t) {
          return (
            (e[t.name] = t.value || (t.type === j.a.slider ? t.min : '')), e
          );
        },
        Ce = function(e, t) {
          return t.validation && (e[t.name] = t.validation), e;
        };
      function Te(e) {
        return o.a.createElement(u.a, Object.assign({ direction: 'up' }, e));
      }
      t.a = c()(
        function(e) {
          return {
            mobile: {},
            paperRoot: {
              width: 'calc(100% - '.concat(e.spacing(4), 'px)'),
              maxWidth: 600,
              margin: e.spacing(2),
              maxHeight: 'calc(100% - '.concat(e.spacing(4), 'px)'),
            },
            dialogTitle: {
              paddingTop: e.spacing(2.5),
              '& > *': {
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              },
              '$mobile &': {
                padding: ''
                  .concat(e.spacing(2), 'px ')
                  .concat(e.spacing(2.5), 'px'),
              },
            },
            wrapperGrid: { overflowX: 'hidden', paddingBottom: e.spacing(1) },
            dialogContent: {
              paddingBottom: 0,
              position: 'relative',
              zIndex: 1,
              background: ''.concat(e.palette.background.paper, ' no-repeat'),
              backgroundImage:
                'dark' === e.palette.type
                  ? 'linear-gradient(to bottom, rgba(0,0,0,.5), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.5), rgba(0,0,0,0))'
                  : 'linear-gradient(to bottom, rgba(0,0,0,.1), rgba(0,0,0,0)), linear-gradient(to top, rgba(0,0,0,.1), rgba(0,0,0,0))',
              backgroundPosition: '-'
                .concat(e.spacing(3), 'px 0, -')
                .concat(e.spacing(3), 'px 100%'),
              backgroundSize: 'calc(100% + '
                .concat(e.spacing(3), 'px) ')
                .concat(e.spacing(2), 'px'),
              '&::before, &::after': {
                content: '""',
                position: 'relative',
                zIndex: -1,
                display: 'block',
                height: e.spacing(4),
                margin: '0 -'
                  .concat(e.spacing(3), 'px -')
                  .concat(e.spacing(4), 'px'),
                background: 'linear-gradient(to bottom, '
                  .concat(e.palette.background.paper, ', ')
                  .concat(
                    e.palette.background.paper,
                    ' 30%, rgba(255, 255, 255, 0))'
                  ),
              },
              '&::after': {
                marginTop: 4 * -e.spacing(1),
                marginBottom: 0,
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0), '
                  .concat(e.palette.background.paper, ' 70%, ')
                  .concat(e.palette.background.paper, ')'),
              },
              '$mobile &': {
                padding: '0 '.concat(e.spacing(2), 'px'),
                '&::before, &::after': {
                  marginLeft: 2 * -e.spacing(1),
                  marginRight: 2 * -e.spacing(1),
                },
              },
            },
            capitalise: { '&::first-letter': { textTransform: 'uppercase' } },
            sectionTitle: { marginLeft: e.spacing(1.5) },
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = this,
          a = e.classes,
          s = e.theme,
          c = e.action,
          u = e.actions,
          S = e.open,
          N = e.data,
          O = e.formTitle,
          w = e.justForm,
          C = e.formHeader,
          T = e.formFooter,
          _ = N.reduce(we, {}),
          I = !0;
        Object(i.useEffect)(
          function() {
            (_ = N ? N.reduce(we, {}) : {}), (I = !0);
          },
          [N]
        );
        var A = Object(l.a)(s.breakpoints.down('xs'));
        return o.a.createElement(
          E.a,
          {
            initialValues: _,
            onSubmit: function(e, t) {
              t.setSubmitting;
              var a = Object.keys(e)
                  .filter(function(e) {
                    return -1 === e.indexOf('-temp');
                  })
                  .map(function(t) {
                    return Object.assign({}, Object(r.a)({}, t, e[t]));
                  })
                  .reduce(function(e, t) {
                    return Object.assign(e, t);
                  }, {}),
                n = Object(x.a)(ke, a),
                i = Object(x.a)(Oe, n);
              u[c](i);
            },
            validationSchema: y.object().shape(N.reduce(Ce, {})),
          },
          function(e) {
            var i = e.values,
              s = e.handleSubmit,
              l = e.setValues,
              E = e.errors,
              y = e.touched;
            I && (l(Object(n.a)({}, i, _)), (I = !1));
            var x = function(e, t) {
                var a = Object(v.a)(t, 1, i[e]);
                l(Object(n.a)({}, i, Object(r.a)({}, e, a)));
              },
              P = function(e, t) {
                if (i[t]) {
                  var a = Array.isArray(i[e]) ? i[e] : [],
                    o = i[t].trim();
                  if (o.length > 0 && !a.includes(o)) {
                    var s,
                      c = a.concat([o]);
                    l(
                      Object(n.a)(
                        {},
                        i,
                        ((s = {}),
                        Object(r.a)(s, e, c),
                        Object(r.a)(s, t, ''),
                        s)
                      )
                    );
                  } else l(Object(n.a)({}, i, Object(r.a)({}, t, '')));
                }
              },
              B = function(e) {
                return (
                  E[e] &&
                  y[e] &&
                  o.a.createElement(
                    p.a,
                    { error: !0, className: a.sectionTitle },
                    'object' == typeof E[e] ? JSON.stringify(E[e]) : E[e]
                  )
                );
              },
              W = o.a.createElement(
                d.a,
                {
                  container: !0,
                  direction: 'row',
                  spacing: 1,
                  className: a.wrapperGrid,
                },
                N.map(function(a, n) {
                  switch (a.type) {
                    case j.a.textField:
                    case j.a.textFieldNumber:
                    case j.a.textFieldPassword:
                    case j.a.textFieldMultiline:
                    case j.a.textFieldEmail:
                    case j.a.textFieldTel:
                      return o.a.createElement(k, {
                        key: a.name,
                        type: a.type,
                        formikProps: e,
                        label: a.label,
                        name: a.name,
                        placeholder: a.placeholder,
                        width: a.width,
                        autoFocus: a.autoFocus,
                        disallowSpace: a.disallowSpace,
                      });
                    case j.a.chipFreeText:
                      return o.a.createElement(L, {
                        key: a.name,
                        label: a.label,
                        name: a.name,
                        formikProps: e,
                        handleAddToList: P,
                        handleDeleteFromList: x,
                      });
                    case j.a.slider:
                      return o.a.createElement(R, {
                        key: a.name,
                        name: a.name,
                        label: a.label,
                        calcValueLabel: a.calcValueLabel,
                        sliderThumbLabel: a.sliderThumbLabel,
                        min: a.min,
                        max: a.max,
                        step: a.step,
                        units: a.units,
                        formikProps: e,
                        validator: B,
                      });
                    case j.a.autocomplete:
                    case j.a.autocompleteMulti:
                    case j.a.autocompleteFreeText:
                    case j.a.autocompleteMultiFreeText:
                      return o.a.createElement(fe, {
                        key: a.name,
                        placeholder: a.placeholder,
                        suggestions: a.suggestions,
                        name: a.name,
                        label: a.label,
                        type: a.type,
                        formikProps: e,
                        width: a.width,
                      });
                    case j.a.date:
                    case j.a.dateTime:
                      return o.a.createElement(M, {
                        key: a.name,
                        name: a.name,
                        label: a.label,
                        type: a.type,
                        formikProps: e,
                        validator: B,
                        width: a.width,
                      });
                    case j.a.dropzone:
                      return o.a.createElement(Z, {
                        key: a.name,
                        formikProps: e,
                        thisBind: t,
                        label: a.label,
                        name: a.name,
                        path: a.path,
                        mimeTypes: a.mimeTypes,
                        validator: B,
                      });
                    case j.a.checkbox:
                      return o.a.createElement(ve, {
                        key: a.name,
                        formikProps: e,
                        label: a.label,
                        name: a.name,
                        validator: B,
                        width: a.width,
                      });
                    case j.a.radio:
                      return o.a.createElement(Ne, {
                        key: a.name,
                        formikProps: e,
                        label: a.label,
                        name: a.name,
                        validator: B,
                        options: a.options,
                        horiz: a.horiz,
                      });
                    default:
                      return null;
                  }
                })
              ),
              D = o.a.createElement(
                m.a,
                {
                  onClick: s,
                  color: 'primary',
                  variant: 'contained',
                  type: 'submit',
                  id: 'submit',
                  classes: { label: a.capitalise },
                },
                c[0].toUpperCase(),
                c.substr(1)
              );
            return o.a.createElement(
              'form',
              { onSubmit: s },
              w
                ? o.a.createElement(d.a, { container: !0 }, C, W, T, D)
                : o.a.createElement(
                    g.a,
                    {
                      open: S,
                      onClose: u.close,
                      classes: { paper: A ? a.mobilePaperRoot : a.paperRoot },
                      fullScreen: A,
                      className: A ? a.mobile : '',
                      TransitionComponent: Te,
                    },
                    o.a.createElement(
                      h.a,
                      {
                        className: a.capitalise,
                        classes: { root: a.dialogTitle },
                      },
                      c,
                      ' ',
                      O
                    ),
                    o.a.createElement(
                      f.a,
                      { classes: { root: a.dialogContent } },
                      C,
                      W,
                      T
                    ),
                    o.a.createElement(
                      b.a,
                      null,
                      o.a.createElement(
                        m.a,
                        { onClick: u.close, color: 'primary', id: 'cancel' },
                        'Cancel'
                      ),
                      D
                    )
                  )
            );
          }
        );
      });
    },
    25: function(e, t, a) {
      'use strict';
      t.a = {
        textField: 'TEXT_FIELD',
        textFieldNumber: 'TEXT_FIELD_NUMBER',
        textFieldPassword: 'TEXT_FIELD_PASSWORD',
        textFieldMultiline: 'TEXT_FIELD_MULTILINE',
        textFieldEmail: 'TEXT_FIELD_EMAIL',
        textFieldTel: 'TEXT_FIELD_TEL',
        chipFreeText: 'CHIP_FREE_TEXT',
        autocomplete: 'AUTOCOMPLETE',
        autocompleteMulti: 'AUTOCOMPLETE_MULTI',
        autocompleteFreeText: 'AUTOCOMPLETE_FREE_TEXT',
        autocompleteMultiFreeText: 'AUTOCOMPLETE_MULTI_FREE_TEXT',
        dropzone: 'DROPZONE',
        slider: 'SLIDER',
        date: 'DATE_PICKER',
        dateTime: 'DATE_TIME_PICKER',
        time: 'TIME_PICKER',
        checkbox: 'CHECKBOX',
        radio: 'RADIO',
      };
    },
    258: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'withOnEnter', function() {
          return i;
        });
      var n = a(0),
        r = a.n(n),
        i = function(e) {
          return function(t) {
            return r.a.createElement(
              e,
              Object.assign({}, t, {
                handleKeyPress: function(e) {
                  t.primaryAction && 'Enter' === e.key && t.primaryAction();
                },
              })
            );
          };
        };
    },
    259: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i);
      t.default = o()(function(e) {
        return {
          root: { marginTop: 20, marginBottom: 10 },
          large: e.typography.caption,
          link: {
            color: e.palette.primary.main,
            textDecoration: 'inherit',
            '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
          },
          primary: { color: e.palette.primary.main },
        };
      })(function(e) {
        var t = e.classes;
        return r.a.createElement(
          'div',
          { className: t.root },
          r.a.createElement(
            'div',
            { className: t.large },
            'By clicking Sign Up, you agree to our ',
            r.a.createElement(
              'a',
              {
                href: 'https://www.2hats.com.au/terms',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: t.link,
              },
              'Terms and Conditions'
            ),
            ' and ',
            r.a.createElement(
              'a',
              {
                href: 'https://www.2hats.com.au/privacy',
                target: '_blank',
                rel: 'noopener noreferrer',
                className: t.link,
              },
              'Privacy Policy'
            )
          )
        );
      });
    },
    260: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(53),
        c = a(0),
        l = a.n(c),
        u = a(7),
        d = a.n(u),
        m = a(11),
        p = a(9),
        g = a(192),
        h = a(36),
        f = a(693),
        b = a.n(f),
        E = a(216),
        y = a.n(E),
        v = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(this, Object(o.a)(t).call(this, e))).state = {
                hasError: !1,
              }),
              a
            );
          }
          return (
            Object(s.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentDidCatch',
                value: function(e, t) {
                  this.setState({ hasError: !0 }), console.log(e, t);
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.classes,
                    a = e.children;
                  return this.state.hasError
                    ? l.a.createElement(
                        m.a,
                        {
                          container: !0,
                          className: t.root,
                          justify: 'center',
                          alignItems: 'center',
                          direction: 'column',
                          wrap: 'nowrap',
                        },
                        l.a.createElement(
                          m.a,
                          { item: !0, className: t.content },
                          l.a.createElement(
                            p.a,
                            { variant: 'h4', className: t.title },
                            'Something went wrong.'
                          ),
                          l.a.createElement(
                            p.a,
                            { variant: 'h6', className: t.subtitle },
                            'We\u2019ve been notified of the error.'
                          ),
                          l.a.createElement(g.a, { className: t.divider }),
                          l.a.createElement(
                            p.a,
                            { variant: 'h5', className: t.title },
                            'You may have an old version of this site.'
                          ),
                          l.a.createElement(
                            p.a,
                            { variant: 'body1', className: t.bodyText },
                            'Please ',
                            l.a.createElement('b', null, 'reload this page'),
                            '.'
                          ),
                          l.a.createElement(
                            'div',
                            { className: t.bodyText },
                            l.a.createElement(
                              h.a,
                              {
                                variant: 'contained',
                                color: 'primary',
                                size: 'large',
                                onClick: function() {
                                  window.location.reload();
                                },
                              },
                              'Reload',
                              l.a.createElement(b.a, null)
                            )
                          ),
                          l.a.createElement(
                            p.a,
                            { variant: 'body1', className: t.bodyText },
                            'We\u2019re constantly updating and improving this site to prevent errors like this. You may have an old version that does not fix this error.'
                          ),
                          l.a.createElement(
                            p.a,
                            { variant: 'body1', className: t.bodyText },
                            'Thank you for your patience.'
                          ),
                          l.a.createElement('img', {
                            src: y.a,
                            alt: '2hats',
                            className: t.logo,
                          })
                        )
                      )
                    : a;
                },
              },
            ]),
            t
          );
        })(c.Component);
      t.default = d()(function(e) {
        return {
          root: {
            width: '100%',
            height: '100%',
            minHeight: '100vh',
            userSelect: 'none',
          },
          content: { padding: e.spacing(2), maxWidth: 480 },
          title: { marginBottom: e.spacing(1.5), fontWeight: 500 },
          subtitle: { fontWeight: 400 },
          bodyText: { marginBottom: e.spacing(2) },
          divider: { margin: ''.concat(e.spacing(4), 'px 0') },
          logo: { marginTop: e.spacing(2), opacity: 0.33, width: 100 },
        };
      })(v);
    },
    261: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(30),
        c = a(53),
        l = a(0),
        u = a.n(l),
        d = a(16),
        m = a.n(d),
        p = a(7),
        g = a.n(p),
        h = a(165),
        f = a(1678),
        b = a(1682),
        E = a(1679),
        y = a(1680),
        v = a(36),
        x = a(11),
        j = a(279),
        S = a(117),
        N = a(281),
        k = a(277),
        O = a.n(k),
        w = a(160),
        C = a(33),
        T = a(5),
        _ = a(161),
        L = (function(e) {
          function t(e) {
            var a;
            return (
              Object(n.a)(this, t),
              ((a = Object(i.a)(this, Object(o.a)(t).call(this, e))).state = {
                open: !1,
                isUploading: !1,
                avatarURL: '',
                hasChanged: !1,
              }),
              (a.openDialog = a.openDialog.bind(Object(s.a)(a))),
              (a.onDrop = a.onDrop.bind(Object(s.a)(a))),
              (a.closeDialog = a.closeDialog.bind(Object(s.a)(a))),
              (a.cancelHandler = a.cancelHandler.bind(Object(s.a)(a))),
              (a.saveHandler = a.saveHandler.bind(Object(s.a)(a))),
              (a.handleUpload = a.handleUpload.bind(Object(s.a)(a))),
              a
            );
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentWillMount',
                value: function() {
                  this.props.avatarURL &&
                    this.setState({ avatarURL: this.props.avatarURL });
                },
              },
              {
                key: 'openDialog',
                value: function() {
                  this.setState({ open: !0 });
                },
              },
              {
                key: 'closeDialog',
                value: function() {
                  this.setState({ open: !1 });
                },
              },
              {
                key: 'cancelHandler',
                value: function() {
                  this.props.avatarURL &&
                    this.setState({
                      avatarURL: this.props.avatarURL,
                      hasChanged: !1,
                    }),
                    this.closeDialog();
                },
              },
              {
                key: 'saveHandler',
                value: function() {
                  C.b
                    .collection(T.COLLECTIONS.users)
                    .doc(this.props.uid)
                    .update({ avatarURL: this.state.avatarURL }),
                    this.closeDialog();
                },
              },
              {
                key: 'handleUpload',
                value: function(e) {
                  this.setState({ avatarURL: e }),
                    this.setState({ isUploading: !1 });
                },
              },
              {
                key: 'onDrop',
                value: function(e, t) {
                  console.log('dropzone', e, t),
                    t.length > 0 && this.setState({ rejectedFile: t[0].name }),
                    e.length > 0 &&
                      (this.setState({ isUploading: !0, hasChanged: !0 }),
                      this.setState({ avatarURL: e[0].preview }),
                      Object(_.a)(e[0], this.handleUpload));
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.avatarURL,
                    a = e.firstName,
                    n = e.lastName,
                    r = e.classes,
                    i = this.state,
                    o = i.isUploading,
                    s = i.open,
                    c = u.a.createElement(
                      S.a,
                      {
                        id: 'profile-button',
                        className: r.avatarButton,
                        onClick: this.openDialog,
                      },
                      u.a.createElement(
                        h.a,
                        { src: t, className: m()(r.avatar) },
                        a[0],
                        n[0]
                      ),
                      u.a.createElement(O.a, { className: r.editIcon })
                    ),
                    l = u.a.createElement(
                      S.a,
                      { id: 'big-profile-button', className: r.avatarButton },
                      u.a.createElement(
                        h.a,
                        { src: t, className: m()(r.avatar, r.bigAvatar) },
                        a[0],
                        n[0]
                      ),
                      u.a.createElement(O.a, {
                        className: m()(r.editIcon, r.bigEditIcon),
                      })
                    );
                  return (
                    (t || this.state.avatarURL) &&
                      ((c = u.a.createElement(
                        S.a,
                        {
                          id: 'profile-button',
                          className: r.avatarButton,
                          onClick: this.openDialog,
                        },
                        u.a.createElement(h.a, {
                          alt: ''.concat(a, ' ').concat(n),
                          src: t,
                          className: r.avatar,
                        }),
                        u.a.createElement(O.a, { className: r.editIcon })
                      )),
                      (l = u.a.createElement(
                        S.a,
                        { id: 'big-profile-button', className: r.avatarButton },
                        u.a.createElement(h.a, {
                          alt: ''.concat(a, ' ').concat(n),
                          src: this.state.avatarURL,
                          className: m()(r.avatar, r.bigAvatar),
                        }),
                        u.a.createElement(O.a, {
                          className: m()(r.editIcon, r.bigEditIcon),
                        })
                      ))),
                    u.a.createElement(
                      'div',
                      null,
                      c,
                      u.a.createElement(
                        f.a,
                        { open: s },
                        u.a.createElement(b.a, null, 'Profile Photo'),
                        u.a.createElement(
                          E.a,
                          null,
                          u.a.createElement(
                            x.a,
                            {
                              container: !0,
                              direction: 'column',
                              alignItems: 'center',
                              style: { width: '100%' },
                            },
                            o &&
                              u.a.createElement(j.a, {
                                className: r.spinner,
                                size: 180,
                              }),
                            u.a.createElement(
                              w.a,
                              {
                                onDrop: this.onDrop.bind(this),
                                className: r.dropZone,
                                accept: 'image/*',
                              },
                              function(e) {
                                var t = e.getRootProps,
                                  a = e.getInputProps;
                                return u.a.createElement(
                                  'div',
                                  t(),
                                  u.a.createElement('input', a()),
                                  l,
                                  u.a.createElement(
                                    N.a,
                                    {
                                      component: 'button',
                                      className: r.link,
                                      variant: 'body1',
                                    },
                                    'Select a file'
                                  )
                                );
                              }
                            )
                          )
                        ),
                        u.a.createElement(
                          y.a,
                          null,
                          u.a.createElement(
                            v.a,
                            { color: 'primary', onClick: this.cancelHandler },
                            'Cancel'
                          ),
                          u.a.createElement(
                            v.a,
                            {
                              color: 'primary',
                              variant: 'contained',
                              onClick: this.saveHandler,
                              id: o ? '' : 'save',
                            },
                            'Save'
                          )
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(l.Component);
      t.default = g()(function(e) {
        return {
          dropZone: { border: 'none !important' },
          avatarButton: {
            padding: 0,
            marginBottom: e.spacing(1),
            overflow: 'hidden',
            '&:hover $editIcon': { opacity: 1 },
          },
          avatar: {
            cursor: 'pointer',
            textTransform: 'uppercase',
            width: e.spacing(8),
            height: e.spacing(8),
            fontSize: e.spacing(4),
          },
          editIcon: {
            opacity: 0,
            position: 'absolute',
            transition: e.transitions.create('opacity', {
              duration: e.transitions.duration.shortest,
            }),
            color: '#fff',
            backgroundColor: 'rgba(0,0,0,.25)',
            boxShadow: '0 0 0 '.concat(e.spacing(2.5), 'px rgba(0,0,0,.25)'),
          },
          bigEditIcon: {
            fontSize: 12 * e.spacing(1),
            boxShadow: '0 0 0 '.concat(e.spacing(5.25), 'px rgba(0,0,0,.25)'),
          },
          bigAvatar: {
            marginLeft: 'auto',
            marginRight: 'auto',
            width: 180,
            height: 180,
            fontSize: 96,
          },
          uploadButton: { marginTop: 10, width: 230 },
          link: {
            display: 'block',
            width: '100%',
            textAlign: 'center',
            marginTop: 20,
          },
          spinner: { position: 'absolute', zIndex: 1 },
        };
      })(L);
    },
    262: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(17),
        i = a(14),
        o = a(0),
        s = a.n(o),
        c = a(16),
        l = a.n(c),
        u = a(7),
        d = a.n(u),
        m = a(9),
        p = a(279),
        g = a(160),
        h = a(156),
        f = a.n(h),
        b = a(712),
        E = a.n(b),
        y = a(157),
        v = a.n(y),
        x = a(59),
        j = a(5),
        S = a(161),
        N = a(21),
        k = a(45);
      t.default = d()(function(e) {
        return Object(
          i.a
        )({}, j.STYLES.DROPZONE(e), { dropzone: Object(i.a)({}, j.STYLES.DROPZONE(e).dropzone, Object(r.a)({ width: '100%', boxSizing: 'border-box' }, e.breakpoints.up('sm'), { marginTop: e.spacing(1) })), fileName: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: -e.spacing(1), width: '100%', textDecoration: 'none', cursor: 'pointer' }, fileIcon: Object(i.a)({}, j.STYLES.DROPZONE(e).fileIcon, { marginRight: e.spacing(0.5), verticalAlign: 'bottom' }), circularProgress: { color: e.palette.text.secondary, margin: e.spacing(1) } });
      })(function(e) {
        var t = e.classes,
          a = e.className,
          r = e.resetOnUpload,
          i = Object(o.useState)({}),
          c = Object(n.a)(i, 2),
          u = c[0],
          d = c[1],
          h = Object(o.useState)(''),
          b = Object(n.a)(h, 2),
          y = b[0],
          O = b[1];
        Object(o.useEffect)(
          function() {
            u.name &&
              u.url &&
              Object(k.d)(j.COLLECTIONS.profiles, w, { resume: u }).then(
                function() {
                  Object(N.b)(
                    N.a.WHATS_NEXT_AI,
                    {},
                    function(e) {
                      return console.log(e);
                    },
                    function(e) {
                      return console.log(e);
                    }
                  ),
                    Object(N.b)(
                      N.a.RESUME_SCRAPER,
                      { uid: w, url: u.url },
                      function(e) {
                        console.log(e);
                      },
                      function(e) {
                        console.log(e);
                      }
                    ),
                    r && d({});
                }
              );
          },
          [u]
        );
        var w = Object(o.useContext)(x.a).user.id;
        return s.a.createElement(
          g.a,
          {
            onDrop: function(e, t) {
              console.log('dropzone', e, t),
                t.length > 0 && O(t[0].name),
                e.length > 0 &&
                  (d({ name: e[0].name }),
                  Object(S.b)(
                    'candidates/'
                      .concat(w, '/resumes/')
                      .concat(new Date().getTime(), '/')
                      .concat(e[0].name),
                    e[0],
                    function(e, t) {
                      d({ name: t.name, url: e }),
                        Object(N.b)(
                          N.a.RESUME_SCRAPER,
                          { uid: w, url: e },
                          function(e) {
                            console.log(e);
                          },
                          function(e) {
                            console.log(e);
                          }
                        );
                    }
                  ));
            },
            accept: 'application/pdf',
            disabled: !(!u.url || !u.name),
          },
          function(e) {
            var n = e.getRootProps,
              r = e.getInputProps,
              i = e.isDragActive;
            return s.a.createElement(
              'div',
              Object.assign({}, n(), {
                className: l()(
                  t.dropzone,
                  i && t.dropzoneDragActive,
                  !(!u.url || !u.name) && t.dropzoneDisabled,
                  a
                ),
              }),
              s.a.createElement('input', r()),
              u.url
                ? s.a.createElement(E.a, { className: t.uploadIcon })
                : u.name
                ? s.a.createElement(p.a, {
                    className: t.circularProgress,
                    size: 48,
                  })
                : s.a.createElement(f.a, { className: t.uploadIcon }),
              u.name
                ? s.a.createElement(
                    m.a,
                    {
                      variant: 'body1',
                      className: t.fileName,
                      component: 'a',
                      href: u.url,
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    },
                    s.a.createElement(v.a, { className: t.fileIcon }),
                    u.name
                  )
                : s.a.createElement(
                    s.a.Fragment,
                    null,
                    s.a.createElement(
                      m.a,
                      { variant: 'body1' },
                      i
                        ? 'Drop your PDF here!'
                        : 'Drag and drop a PDF or click here'
                    ),
                    y &&
                      s.a.createElement(
                        m.a,
                        { variant: 'body2', color: 'error' },
                        y,
                        ' is invalid'
                      )
                  )
            );
          }
        );
      });
    },
    263: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(17),
        i = a(14),
        o = a(0),
        s = a.n(o),
        c = a(64),
        l = a(7),
        u = a.n(l),
        d = a(11),
        m = a(9),
        p = a(63),
        g = a.n(p),
        h = a(67),
        f = a.n(h),
        b = a(482),
        E = a(158),
        y = a(264),
        v = a(278),
        x = a(59),
        j = a(116),
        S = a(88),
        N = a(5),
        k = a(13),
        O = a(31),
        w = a.n(O);
      t.default = Object(c.a)(
        u()(
          function(e) {
            return Object(i.a)({}, N.STYLES.RENDERED_HTML(e), {
              root: Object(r.a)(
                {
                  position: 'relative',
                  boxSizing: 'border-box',
                  margin: '0 auto',
                  marginBottom: e.spacing(6),
                  padding: e.spacing(4),
                  borderRadius: e.shape.borderRadius,
                  backgroundColor: e.palette.background.paper,
                  userSelect: 'none',
                  boxShadow: e.shadowsLight[24],
                },
                e.breakpoints.down('sm'),
                {
                  width: 'calc(100% - '.concat(e.spacing(2), 'px) !important'),
                  maxWidth: 660,
                }
              ),
              iconWrapper: {
                marginRight: e.spacing(2),
                marginLeft: -e.spacing(1) / 2,
              },
              icon: { fontSize: 32, color: e.palette.primary.main },
              title: {
                fontWeight: 500,
                marginTop: 2,
                color: e.palette.primary.main,
              },
              divider: Object(r.a)(
                {
                  margin: e.spacing(3),
                  marginLeft: e.spacing(7),
                  marginRight: e.spacing(1),
                },
                e.breakpoints.down('sm'),
                { marginLeft: 0, marginRight: 0 }
              ),
              specialLabelWrapper: {
                marginLeft: -e.spacing(1) / 2,
                marginTop: e.spacing(2),
              },
              fullHeight: { height: '100%' },
              jobWrapper: {
                cursor: 'pointer',
                '&:hover $jobTitle': { color: e.palette.primary.main },
                '&:hover $media': { opacity: 0.9 },
              },
              jobTitle: {
                marginTop: 2,
                transition: e.transitions.create('color', {
                  duration: e.transitions.duration.short,
                }),
              },
              titleArrow: {
                verticalAlign: 'text-bottom',
                opacity: 0.87,
                marginLeft: e.spacing(1),
              },
              media: Object(r.a)(
                {
                  width: 100,
                  height: 100,
                  float: 'right',
                  borderRadius: 0.75 * e.shape.borderRadius,
                  transition: e.transitions.create('opacity'),
                  marginLeft: e.spacing(1),
                  marginBottom: e.spacing(1),
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                },
                e.breakpoints.down('sm'),
                { width: 75, height: 75 }
              ),
              daysRemaining: { fontWeight: 500, marginTop: e.spacing(2) },
              skillsWrapper: { marginTop: e.spacing(2) },
            });
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.theme,
            r = e.width,
            i = e.history,
            c = Object(v.a)(a.breakpoints.down('sm')),
            l = Object(o.useContext)(x.a).user,
            u = Object(j.a)({
              path: N.COLLECTIONS.announcements,
              filters: [{ field: 'published', operator: '==', value: !0 }],
              sort: { field: 'createdAt', direction: 'desc' },
            }),
            p = Object(n.a)(u, 1)[0].documents[0],
            h = Object(S.a)(),
            O = Object(n.a)(h, 2),
            C = O[0],
            T = O[1],
            _ = C.doc;
          if (
            (Object(o.useEffect)(
              function() {
                p &&
                  p.jobId &&
                  !C.path &&
                  T({
                    path: ''.concat(N.COLLECTIONS.jobs, '/').concat(p.jobId),
                  });
              },
              [p]
            ),
            !p || !_)
          )
            return null;
          var L = w.a.unix(_.closingDate.seconds).diff(w()(), 'days');
          if (L < 0) return null;
          var I = l.skills
            ? []
            : _.skillsRequired.map(function(e) {
                return e.id;
              });
          return (
            _.skillsRequired
              .map(function(e) {
                return e.id;
              })
              .forEach(function(e) {
                l.skills && !l.skills.includes(e) && I.push(e);
              }),
            s.a.createElement(
              'div',
              { className: t.root, style: { width: r - 16 } },
              s.a.createElement(
                d.a,
                { container: !0, alignItems: 'stretch', spacing: 3 },
                s.a.createElement(
                  d.a,
                  { item: !0, xs: 12, sm: 7 },
                  s.a.createElement(
                    d.a,
                    {
                      container: !0,
                      direction: c ? 'column' : 'row',
                      className: t.fullHeight,
                    },
                    s.a.createElement(
                      d.a,
                      { item: !0, className: t.iconWrapper },
                      s.a.createElement(g.a, { className: t.icon })
                    ),
                    s.a.createElement(
                      d.a,
                      { item: !0, xs: !0 },
                      s.a.createElement(
                        d.a,
                        { item: !0, xs: !0 },
                        s.a.createElement(
                          m.a,
                          {
                            variant: 'h6',
                            className: t.title,
                            gutterBottom: !0,
                          },
                          p.title
                        ),
                        s.a.createElement('div', {
                          className: t.renderedHtml,
                          dangerouslySetInnerHTML: { __html: p.description },
                        })
                      ),
                      s.a.createElement(
                        d.a,
                        { item: !0 },
                        s.a.createElement(
                          'div',
                          { className: t.specialLabelWrapper },
                          p.specialLabel.map(function(e) {
                            return s.a.createElement(b.default, {
                              key: e,
                              color: 'primary',
                              label: e,
                            });
                          })
                        )
                      )
                    )
                  )
                ),
                s.a.createElement(
                  d.a,
                  { item: !0, xs: 12, sm: 5, className: t.ctaWrapper },
                  s.a.createElement(
                    'div',
                    {
                      onClick: function() {
                        i.push(''.concat(k.h, '?id=').concat(p.jobId));
                      },
                      className: t.jobWrapper,
                    },
                    s.a.createElement('div', {
                      className: t.media,
                      style: {
                        backgroundImage: 'url('.concat(
                          _.image && _.image.url,
                          ')'
                        ),
                      },
                    }),
                    s.a.createElement(
                      m.a,
                      {
                        variant: 'h6',
                        gutterBottom: !0,
                        className: t.jobTitle,
                      },
                      _.title,
                      s.a.createElement(f.a, {
                        className: t.titleArrow,
                        fontSize: 'small',
                      })
                    ),
                    s.a.createElement(
                      m.a,
                      { variant: 'h5', className: t.daysRemaining },
                      L > 1 ? ''.concat(L, ' days') : 'Last day'
                    ),
                    s.a.createElement(
                      m.a,
                      { variant: 'body2', gutterBottom: !0 },
                      L > 1 && 'left',
                      ' to apply'
                    )
                  ),
                  s.a.createElement(
                    'div',
                    { className: t.skillsWrapper },
                    s.a.createElement(
                      m.a,
                      { variant: 'subtitle1', gutterBottom: !0 },
                      'Skills required',
                      s.a.createElement(y.default, {
                        skillsRequired: _.skillsRequired,
                        skillsNotAchieved: I,
                      })
                    ),
                    _.skillsRequired.map(function(e, t) {
                      return s.a.createElement(E.a, {
                        key: ''.concat(t, '-').concat(e),
                        value: e,
                        clickable: !0,
                        dense: !0,
                      });
                    })
                  )
                )
              )
            )
          );
        })
      );
    },
    264: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(49),
        u = a.n(l);
      t.default = c()(function(e) {
        return {
          root: {
            fontSize: '1rem',
            backgroundColor: e.palette.text.primary,
            color: e.palette.background.paper,
            borderRadius: '500px',
            margin: e.spacing(1),
            padding: ''
              .concat(e.spacing(0.5), 'px ')
              .concat(e.spacing(1.25), 'px'),
            userSelect: 'none',
          },
          orange: {
            backgroundColor: e.palette.primary.light,
            color: e.palette.primary.main,
          },
          green: { backgroundColor: u.a[100], color: u.a[800] },
        };
      })(function(e) {
        var t = e.classes,
          a = e.skillsNotAchieved,
          n = e.skillsRequired;
        return r.a.createElement(
          'span',
          { className: o()(t.root, 0 === a.length ? t.green : t.orange) },
          n.length - a.length,
          ' of',
          ' ',
          n.length,
          ' achieved'
        );
      });
    },
    265: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(9),
        c = a(158);
      t.default = o()(function(e) {
        return {
          skillsRequiredLabel: {
            marginLeft: e.spacing(0.25),
            marginTop: e.spacing(1.5),
          },
          skillsWrapper: { marginLeft: -e.spacing(1) / 4 },
          extraSkills: {
            display: 'inline-block',
            verticalAlign: 'bottom',
            margin: e.spacing(0.25),
            fontWeight: 500,
            opacity: 0.5,
            borderRadius: e.shape.borderRadius / 2,
            padding: ''
              .concat(e.spacing(0.5), 'px ')
              .concat(e.spacing(1.5), 'px'),
            backgroundColor: e.palette.divider,
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.values,
          n = e.header;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(
            s.a,
            { variant: 'subtitle2', className: t.skillsRequiredLabel },
            n || 'Skills required'
          ),
          r.a.createElement(
            'div',
            { className: t.skillsWrapper },
            a.slice(0, 3).map(function(e, t) {
              return r.a.createElement(c.a, {
                key: ''.concat(t, '-').concat(e),
                value: e,
                dense: !0,
              });
            }),
            a.length > 3 &&
              r.a.createElement(
                s.a,
                { variant: 'body1', className: t.extraSkills },
                '+',
                a.length - 3,
                ' more'
              )
          )
        );
      });
    },
    268: function(e, t, a) {
      'use strict';
      a.d(t, 'c', function() {
        return n;
      }),
        a.d(t, 'b', function() {
          return r;
        }),
        a.d(t, 'a', function() {
          return i;
        });
      var n = '78lsnhtnykf802',
        r =
          '188089188588-8r48rugf1o7i1dl1j6himv4kvk19erv5.apps.googleusercontent.com',
        i =
          '1045443129080-6pd4ivjeuhp4boapn17ti36d2nn80ml7.apps.googleusercontent.com';
    },
    272: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(64),
        o = a(7),
        s = a.n(o),
        c = a(9),
        l = a(67),
        u = a.n(l);
      t.default = Object(i.a)(
        s()(
          function(e) {
            return {
              root: {
                cursor: 'pointer',
                transition: e.transitions.create(['color'], {
                  duration: e.transitions.duration.shortest,
                }),
                '& *': { color: 'inherit' },
                '&:hover, &:active': { color: e.palette.primary.main },
                '&:active': { opacity: 0.5 },
              },
              value: { marginBottom: e.spacing(1) },
              icon: {
                verticalAlign: 'baseline',
                position: 'relative',
                top: 3,
                marginLeft: e.spacing(0.5),
                transitionDuration: '0 ms',
                opacity: 0.87,
              },
              title: { whiteSpace: 'pre-line', lineHeight: 1.25 },
              goIcon: {
                verticalAlign: 'bottom',
                marginLeft: e.spacing(0.25),
                opacity: 0.87,
                fontSize: 18,
              },
            };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.isXs,
            n = e.history,
            i = e.val,
            o = e.Icon,
            s = e.title,
            l = e.route;
          return r.a.createElement(
            'div',
            {
              className: t.root,
              onClick: function() {
                n.push(l);
              },
            },
            r.a.createElement(
              c.a,
              { variant: a ? 'h4' : 'h3', className: t.value },
              i,
              r.a.createElement(o, { className: t.icon })
            ),
            r.a.createElement(
              c.a,
              { variant: a ? 'body2' : 'body1', className: t.title },
              s,
              r.a.createElement(u.a, { className: t.goIcon })
            )
          );
        })
      );
    },
    273: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(0),
        o = a.n(i),
        s = a(16),
        c = a.n(s),
        l = a(64),
        u = a(7),
        d = a.n(u),
        m = a(9),
        p = a(192),
        g = a(36),
        h = a(281),
        f = a(67),
        b = a.n(f),
        E = a(377),
        y = a.n(E),
        v = a(723),
        x = a.n(v),
        j = a(49),
        S = a.n(j),
        N = a(139),
        k = a.n(N),
        O = a(222),
        w = a(77),
        C = a(59),
        T = a(13),
        _ = a(5),
        L = function(e) {
          return {
            root: { marginTop: e.spacing(2) },
            divider: { margin: ''.concat(e.spacing(3), 'px 0') },
            resubmittedLink: { verticalAlign: 'baseline' },
            feedbackItem: { marginTop: e.spacing(2) },
            feedbackIcon: {
              display: 'inline-block',
              marginLeft: 4 * -e.spacing(1),
              marginTop: 2,
              float: 'left',
            },
            passIcon: { color: S.a[500] },
            failIcon: { color: k.a[500] },
            renderedHtml: Object(r.a)(
              {},
              _.STYLES.RENDERED_HTML(e).renderedHtml,
              e.typography.body2
            ),
          };
        },
        I = d()(L)(function(e) {
          var t = e.classes,
            a = e.data;
          return o.a.createElement(
            'div',
            { className: t.feedbackItem },
            a.id &&
              ('pass' === a.outcome
                ? o.a.createElement(y.a, {
                    className: c()(t.feedbackIcon, t.passIcon),
                  })
                : o.a.createElement(x.a, {
                    className: c()(t.feedbackIcon, t.failIcon),
                  })),
            a.id && o.a.createElement(m.a, { variant: 'subtitle1' }, a.title),
            o.a.createElement('div', {
              className: t.renderedHtml,
              dangerouslySetInnerHTML: { __html: a.message },
            })
          );
        });
      t.default = Object(l.a)(
        d()(L)(function(e) {
          var t = e.classes,
            a = e.data,
            r = e.history,
            s = Array.isArray(a.feedback) && a.feedback.length > 0,
            c = Object(i.useState)(!1),
            l = Object(n.a)(c, 2),
            u = l[0],
            d = l[1],
            f = Object(i.useContext)(C.a).user;
          if (u)
            return o.a.createElement(w.default, {
              message: 'Creating submission\u2026',
            });
          var E = a.resubmitted
            ? o.a.createElement(
                o.a.Fragment,
                null,
                o.a.createElement(p.a, { className: t.divider }),
                o.a.createElement(
                  m.a,
                  { variant: 'body1' },
                  'This feedback is for an old submission. You\u2019ve already made a',
                  ' ',
                  o.a.createElement(
                    h.a,
                    {
                      component: 'button',
                      variant: 'body1',
                      onClick: function() {
                        r.push(
                          ''
                            .concat(T.a, '?id=')
                            .concat(a.resubmitted, '&yours=true')
                        );
                      },
                      className: t.resubmittedLink,
                    },
                    'new submission'
                  ),
                  '.'
                )
              )
            : o.a.createElement(
                o.a.Fragment,
                null,
                o.a.createElement(p.a, { className: t.divider }),
                o.a.createElement(
                  m.a,
                  { variant: 'body1', gutterBottom: !0 },
                  'You can make one more submission.'
                ),
                o.a.createElement(
                  g.a,
                  {
                    onClick: function() {
                      d(!0), Object(O.c)(a, f, r);
                    },
                    variant: 'contained',
                    color: 'primary',
                  },
                  'Resubmit',
                  o.a.createElement(b.a, null)
                )
              );
          return s || 'pass' !== a.outcome
            ? o.a.createElement(
                'div',
                { className: t.root },
                s &&
                  o.a.createElement(
                    o.a.Fragment,
                    null,
                    o.a.createElement(p.a, { className: t.divider }),
                    o.a.createElement(
                      m.a,
                      { variant: 'h6', gutterBottom: !0 },
                      'Feedback'
                    ),
                    a.feedback.map(function(e, t) {
                      return o.a.createElement(I, { key: t, data: e });
                    })
                  ),
                'pass' !== a.outcome && E
              )
            : null;
        })
      );
    },
    274: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return r;
      }),
        a.d(t, 'b', function() {
          return i;
        }),
        a.d(t, 'c', function() {
          return o;
        });
      var n = a(31),
        r = a
          .n(n)()()
          .startOf('day'),
        i = function() {
          var e = [];
          r.isoWeekday() >= 5
            ? e.push(
                r
                  .clone()
                  .add(1, 'week')
                  .startOf('isoWeek')
              )
            : e.push(r.clone().startOf('isoWeek'));
          for (var t = 0; t < 4; t++) e.push(e[t].clone().add(1, 'day'));
          e.push(e[0].clone().add(1, 'week'));
          for (var a = 5; a < 9; a++) e.push(e[a].clone().add(1, 'day'));
          return e;
        },
        o = function(e, t) {
          for (
            var a = e.filter(function(e) {
                return (
                  e.duration >= 10 &&
                  e.start
                    .clone()
                    .startOf('day')
                    .isSameOrBefore(t) &&
                  e.end
                    .clone()
                    .startOf('day')
                    .isSameOrAfter(t)
                );
              }),
              n = [],
              r = t
                .clone()
                .startOf('day')
                .hours(10);
            r.isBefore(
              t
                .clone()
                .startOf('day')
                .hours(17)
            );

          )
            for (var i = r.clone().add(1, 'hour'); r.isBefore(i); ) {
              for (
                var o = r.clone().minutes(r.minutes() < 30 ? 0 : 30),
                  s = o.clone().add(30, 'minutes'),
                  c = ''
                    .concat(o.format('h:mm a'), ' \u2013 ')
                    .concat(s.format('h:mm a')),
                  l = 0;
                l < a.length;
                l++
              ) {
                var u = a[l];
                if (
                  r.isBetween(u.start, u.end) &&
                  r
                    .clone()
                    .add(10, 'minutes')
                    .isBetween(u.start, u.end)
                ) {
                  n.push(c);
                  break;
                }
              }
              n.includes(c)
                ? r.minutes() >= 30
                  ? r.minutes(0).add(1, 'hour')
                  : r.minutes(30)
                : r.add(10, 'minutes');
            }
          return n;
        };
    },
    276: function(e, t, a) {
      e.exports = a.p + 'static/media/Tick.f6f09296.svg';
    },
    33: function(e, t, a) {
      'use strict';
      var n = a(90),
        r = a.n(n),
        i = (a(1399),
        a(1401),
        a(1405),
        ''.concat('staging2hats', '.firebaseapp.com'),
        'https://'.concat('staging2hats', '.firebaseio.com'),
        ''.concat('staging2hats', '.appspot.com'),
        {
          apiKey: 'AIzaSyD9EnwYfFxTvnaDMA7r6MbKoXmZbQmukrg',
          authDomain: ''.concat('production2hats', '.firebaseapp.com'),
          databaseURL: 'https://'.concat('production2hats', '.firebaseio.com'),
          projectId: 'production2hats',
          storageBucket: ''.concat('production2hats', '.appspot.com'),
          messagingSenderId: '188089188588',
        });
      a.d(t, 'a', function() {
        return o;
      }),
        a.d(t, 'b', function() {
          return s;
        }),
        a.d(t, 'c', function() {
          return c;
        }),
        a.d(t, 'd', function() {
          return l;
        }),
        console.log('production'),
        r.a.initializeApp(i);
      var o = r.a.auth(),
        s = r.a.firestore(),
        c = s,
        l = r.a.app().functions('asia-northeast1');
    },
    333: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'doCreateUserWithEmailAndPassword', function() {
          return r;
        }),
        a.d(t, 'doSignInWithEmailAndPassword', function() {
          return i;
        }),
        a.d(t, 'doSignInWithCustomToken', function() {
          return o;
        }),
        a.d(t, 'doSignOut', function() {
          return s;
        }),
        a.d(t, 'doPasswordReset', function() {
          return c;
        }),
        a.d(t, 'doPasswordUpdate', function() {
          return l;
        });
      var n = a(33),
        r = function(e, t) {
          return n.a.createUserWithEmailAndPassword(e, t);
        },
        i = function(e, t, a) {
          return n.a.signInWithEmailAndPassword(e, t);
        },
        o = function(e) {
          return n.a.signInWithCustomToken(e);
        },
        s = function() {
          return n.a.signOut();
        },
        c = function(e) {
          return n.a.sendPasswordResetEmail(e);
        },
        l = function(e) {
          return n.a.currentUser.updatePassword(e);
        };
    },
    334: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(14),
        s = a(17),
        c = a(50),
        l = a(51),
        u = a(54),
        d = a(52),
        m = a(30),
        p = a(53),
        g = a(0),
        h = a.n(g),
        f = a(7),
        b = a.n(f),
        E = a(11),
        y = a(121),
        v = a.n(y),
        x = a(13),
        j = a(64),
        S = a(41),
        N = a(344),
        k = a(178),
        O = a(459),
        w = a(460),
        C = a(462),
        T = a(358),
        _ = a(464),
        L = a(466),
        I = a(468),
        A = a(469),
        R = a(359),
        P = a(33),
        B = a(90),
        W = a.n(B),
        D = a(21),
        q = a(333),
        M = {
          firstName: '',
          lastName: '',
          password: '',
          isMounted: !0,
          confirmPassword: '',
          email: '',
          error: null,
          view: S.a.auth,
          isLoading: !1,
          progress: 10,
          snackBar: null,
          timeStamp: '',
          isLessThan840: !1,
        },
        H = (function(e) {
          function t(e) {
            var a;
            return (
              Object(c.a)(this, t),
              ((a = Object(u.a)(
                this,
                Object(d.a)(t).call(this, e)
              )).updateWindowDimensions = function() {
                a.setState({ isLessThan840: window.innerWidth < 840 });
              }),
              (a.handleError = function(e) {
                a.setState({
                  snackBar: { message: e.message, variant: 'error' },
                  isLoading: !1,
                });
              }),
              (a.handleChange = function(e, t) {
                a.setState(Object(s.a)({}, e, t));
              }),
              (a.handleForgotPassword = function() {
                var e = a.state,
                  t = e.isLoading,
                  n = e.email;
                if (!t) {
                  var r = { email: n.toLowerCase() };
                  a.setState({ isLoading: !0 }),
                    Object(D.b)(
                      D.a.RESET_PASSWORD,
                      r,
                      function(e) {
                        a.setState({
                          snackBar: {
                            message:
                              'We set you an email to reset your password.',
                            variant: 'success',
                          },
                          isLoading: !1,
                        });
                      },
                      function(e) {
                        a.setState({
                          snackBar: { message: e.message, variant: 'error' },
                          isLoading: !1,
                        });
                      }
                    );
                }
              }),
              (a.state = Object(o.a)({}, M)),
              (a.goTo = a.goTo.bind(Object(m.a)(a))),
              (a.handleChange = a.handleChange.bind(Object(m.a)(a))),
              (a.handleSignup = a.handleSignup.bind(Object(m.a)(a))),
              (a.handleSignin = a.handleSignin.bind(Object(m.a)(a))),
              (a.handleError = a.handleError.bind(Object(m.a)(a))),
              (a.handleUpdatePassword = a.handleUpdatePassword.bind(
                Object(m.a)(a)
              )),
              (a.handleGTevent = a.handleGTevent.bind(Object(m.a)(a))),
              (a.handleBack = a.handleBack.bind(Object(m.a)(a))),
              (a.handleForgotPassword = a.handleForgotPassword.bind(
                Object(m.a)(a)
              )),
              a
            );
          }
          return (
            Object(p.a)(t, e),
            Object(l.a)(t, [
              {
                key: 'componentWillMount',
                value: (function() {
                  var e = Object(i.a)(
                    r.a.mark(function e() {
                      var t,
                        a = this;
                      return r.a.wrap(
                        function(e) {
                          for (;;)
                            switch ((e.prev = e.next)) {
                              case 0:
                                if (
                                  (Object(N.a)(D.a.CHECK_EMAIL),
                                  (t = v.a.parse(
                                    this.props.history.location.search
                                  )),
                                  [
                                    'firstName',
                                    'smartKey',
                                    'route',
                                    'email',
                                  ].forEach(function(e) {
                                    t[e] &&
                                      a.setState(Object(s.a)({}, e, t[e]));
                                  }),
                                  this.setState({ urlParams: t }),
                                  this.props.view &&
                                    this.setState({ view: this.props.view }),
                                  this.props.view !== S.a.logout)
                                ) {
                                  e.next = 11;
                                  break;
                                }
                                return (e.next = 9), q.doSignOut();
                              case 9:
                                this.setState({ view: S.a.logout }),
                                  this.goTo(x.j);
                              case 11:
                              case 'end':
                                return e.stop();
                            }
                        },
                        e,
                        this
                      );
                    })
                  );
                  return function() {
                    return e.apply(this, arguments);
                  };
                })(),
              },
              {
                key: 'componentDidMount',
                value: function() {
                  this.updateWindowDimensions(),
                    window.addEventListener(
                      'resize',
                      this.updateWindowDimensions
                    );
                },
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  window.removeEventListener(
                    'resize',
                    this.updateWindowDimensions
                  );
                },
              },
              {
                key: 'handleGTevent',
                value: function(e) {
                  window.dataLayer.push({
                    event: 'VirtualPageview',
                    virtualPageURL: '/virtual/'.concat(e, '-Success/'),
                    virtualPageTitle: ''.concat(e, '-Success'),
                  });
                },
              },
              {
                key: 'goTo',
                value: function(e) {
                  this.props.history.push(e);
                },
              },
              {
                key: 'handleSignin',
                value: function() {
                  var e = this;
                  this.setState({ isLoading: !0 });
                  var t = this.state;
                  !(function(e, t, a) {
                    var n = e.email,
                      r = e.password;
                    P.a
                      .signInWithEmailAndPassword(n, r)
                      .then(t)
                      .catch(function(e) {
                        a(e);
                      });
                  })(
                    { email: t.email, password: t.password },
                    function() {
                      e.goTo(
                        e.state.route ? decodeURIComponent(e.state.route) : x.f
                      ),
                        e.handleGTevent('Signin');
                    },
                    this.handleError
                  );
                },
              },
              {
                key: 'handleSignup',
                value: function() {
                  var e = this;
                  if (!this.state.isLoading) {
                    var t = this.state,
                      a = t.firstName,
                      n = t.lastName,
                      r = t.email,
                      i = t.password;
                    if ('' !== a || '' !== n) {
                      var o = {
                        firstName: a,
                        lastName: n,
                        email: r,
                        password: i,
                      };
                      this.setState({ isLoading: !0 }),
                        (function(e, t, a) {
                          var n = e.firstName,
                            r = e.lastName,
                            i = e.email,
                            o = e.password;
                          P.a
                            .createUserWithEmailAndPassword(i, o)
                            .then(function(e) {
                              e.user
                                .updateProfile({
                                  displayName: ''.concat(n, ' ').concat(r),
                                })
                                .then(function() {
                                  var a = e.user.uid,
                                    o = i.toLowerCase();
                                  P.b
                                    .collection('users')
                                    .doc(a)
                                    .set({
                                      emailVerified: !1,
                                      email: o,
                                      firstName: n,
                                      lastName: r,
                                      createdAt: W.a.firestore.FieldValue.serverTimestamp(),
                                      signupMethod: 'password',
                                    }),
                                    P.b
                                      .collection('profiles')
                                      .doc(a)
                                      .set({
                                        bio: '',
                                        createdAt: W.a.firestore.FieldValue.serverTimestamp(),
                                        firstName: n,
                                        lastName: r,
                                      }),
                                    t(x.f);
                                });
                            })
                            .catch(function(e) {
                              a(e);
                            });
                        })(
                          o,
                          function(t) {
                            console.log('going to ' + t),
                              e.goTo(
                                e.state.route
                                  ? decodeURIComponent(e.state.route)
                                  : t
                              ),
                              e.handleGTevent('Signup');
                          },
                          this.handleError
                        );
                    } else
                      this.setState({
                        snackBar: {
                          message: 'Please enter you first and last name',
                          variant: 'error',
                        },
                        isLoading: !1,
                      });
                  }
                },
              },
              {
                key: 'handleUpdatePassword',
                value: function(e) {
                  var t = this,
                    a = this.state,
                    n = a.password,
                    r = a.smartKey;
                  !(function(e, t, a) {
                    P.a.currentUser
                      .updatePassword(e)
                      .then(function() {
                        P.b
                          .collection('users')
                          .doc(P.a.currentUser.uid)
                          .update({
                            noPassword: !1,
                            providers: [
                              { id: P.a.currentUser.uid, service: 'password' },
                            ],
                          }),
                          t();
                      })
                      .catch(function(e) {
                        a(e);
                      });
                  })(
                    n,
                    function() {
                      t.goTo(e),
                        Object(D.b)(D.a.DISABLE_SMART_LINK, {
                          slKey: r,
                          reason: 'This link has already been used',
                        });
                    },
                    this.handleError
                  );
                },
              },
              {
                key: 'handleBack',
                value: function() {
                  this.setState({ view: S.a.auth });
                },
              },
              {
                key: 'render',
                value: function() {
                  var e,
                    t = this.props.classes,
                    a = this.state,
                    n = a.firstName,
                    r = a.lastName,
                    i = a.password,
                    o = a.isLoading,
                    s = a.snackBar,
                    c = a.email,
                    l = a.view,
                    u = a.isLessThan840,
                    d = this.props.history.location.pathname === x.p;
                  switch (l) {
                    case S.a.google:
                      e = h.a.createElement(T.default, {
                        type: 'Google',
                        isLoading: o,
                        email: c,
                        backHandler: this.handleBack,
                        firstName: n,
                        GTeventHandler: this.handleGTevent,
                        onSignupRoute: d,
                        changeHandler: this.handleChange,
                      });
                      break;
                    case S.a.linkedin:
                      e = h.a.createElement(T.default, {
                        type: 'LinkedIn',
                        isLoading: o,
                        email: c,
                        backHandler: this.handleBack,
                        firstName: n,
                        onSignupRoute: d,
                        changeHandler: this.handleChange,
                      });
                      break;
                    case S.a.signup:
                      e = h.a.createElement(_.default, {
                        isLoading: o,
                        email: c,
                        backHandler: this.handleBack,
                        onSignupRoute: d,
                        changeHandler: this.handleChange,
                        firstName: n,
                        lastName: r,
                        password: i,
                        passwordAction: this.handleSignup,
                      });
                      break;
                    case S.a.password:
                      e = h.a.createElement(L.default, {
                        isLoading: o,
                        email: c,
                        backHandler: this.handleBack,
                        changeHandler: this.handleChange,
                        firstName: n,
                        password: i,
                        passwordAction: this.handleSignin,
                        forgotPasswordHandler: this.handleForgotPassword,
                      });
                      break;
                    case S.a.resetPassword:
                      e = h.a.createElement(I.default, {
                        firstName: n,
                        changeHandler: this.handleChange,
                        password: i,
                        passwordAction: this.handleUpdatePassword,
                        isLoading: o,
                      });
                      break;
                    case S.a.createPassword:
                      e = h.a.createElement(A.default, {
                        onSignupRoute: d,
                        isLoading: o,
                        firstName: n,
                        handleGTevent: this.handleGTevent,
                        changeHandler: this.handleChange,
                        password: i,
                        passwordAction: this.handleUpdatePassword,
                      });
                      break;
                    case S.a.logout:
                      e = h.a.createElement(R.default, {
                        message: 'You have successfully logged out',
                        destination: x.o,
                        destinationName: 'sign in',
                      });
                      break;
                    case S.a.noPassword:
                      e = h.a.createElement(C.default, {
                        changeHandler: this.handleChange,
                        isLoading: o,
                        email: c,
                        backHandler: this.handleBack,
                        firstName: n,
                      });
                      break;
                    case S.a.validateEmail:
                      e = h.a.createElement(R.default, {
                        message: 'Thank you, we have validated your email',
                        destination: x.f,
                        destinationName: 'dashboard',
                      });
                      break;
                    default:
                      e = h.a.createElement(w.default, {
                        isLessThan840: u,
                        onSignupRoute: d,
                        isLoading: o,
                        handleGTevent: this.handleGTevent,
                        changeHandler: this.handleChange,
                        urlParams: this.state.urlParams,
                      });
                  }
                  return h.a.createElement(
                    E.a,
                    {
                      container: !0,
                      className: t.root,
                      alignItems: 'center',
                      justify: 'center',
                    },
                    u
                      ? null
                      : l !== S.a.auth
                      ? null
                      : h.a.createElement(O.default, null),
                    h.a.createElement(
                      E.a,
                      { item: !0 },
                      h.a.createElement(
                        k.default,
                        {
                          width: 350,
                          height: 'auto',
                          isLoading: o,
                          snackBar: s,
                        },
                        h.a.createElement(
                          E.a,
                          {
                            container: !0,
                            className: t.logoInCardGrid,
                            alignItems: 'center',
                            direction: 'column',
                            justify: 'space-between',
                          },
                          e
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(h.a.Component);
      t.default = Object(j.a)(
        b()(function(e) {
          return {
            root: { height: '100vh' },
            logoInCardGrid: {
              paddingLeft: 35,
              paddingRight: 35,
              paddingBottom: 40,
            },
          };
        })(H)
      );
    },
    344: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return r;
      });
      var n = a(21),
        r = function(e) {
          Object(n.b)(
            e,
            { warmUp: !0 },
            function(t) {
              console.log('Call '.concat(e, ' success: '), t);
            },
            function(t) {
              console.log('Call '.concat(e, ' error: '), t.message);
            }
          );
        };
    },
    345: function(e, t, a) {
      e.exports = a.p + 'static/media/DarkText.95589353.svg';
    },
    346: function(e, t, a) {
      'use strict';
      function n(e, t, a) {
        (document.body.style.backgroundSize = a ? 'fit' : 'cover'),
          t
            ? document.body.style.backgroundImage !== 'url('.concat(t, ')') &&
              ((document.body.style.backgroundColor = e),
              (document.body.style.backgroundImage = 'url('.concat(t, ')')),
              (document.body.style.backgroundSize = 'cover'),
              (document.body.style.backgroundRepeat = 'no-repeat'),
              (document.body.style.backgroundPosition = 'center center'))
            : ((document.body.style.backgroundColor = e),
              (document.body.style.backgroundImage = 'none'),
              (document.body.style.backgroundRepeat = 'no-repeat'),
              (document.body.style.backgroundPosition = 'center center'));
      }
      a.d(t, 'a', function() {
        return n;
      });
    },
    352: function(e, t, a) {
      e.exports = a.p + 'static/media/SignUpWoman.99a736a1.svg';
    },
    353: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return c;
      }),
        a.d(t, 'b', function() {
          return l;
        });
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(33),
        s = a(21),
        c = (function() {
          var e = Object(i.a)(
            r.a.mark(function e(t, a) {
              var n;
              return r.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = { jwtToken: t.jwtToken }),
                        t.avatarURL,
                        Object(s.b)(
                          s.a.AUTHENTICATE_GOOGLE,
                          n,
                          function(e) {
                            console.log(e.data),
                              o.a
                                .signInWithCustomToken(e.data.token)
                                .then(function() {
                                  a(e.data.route);
                                }),
                              console.log(
                                'Call authenticate3rdParty success: ',
                                e
                              );
                          },
                          function(e) {
                            console.log('Call authenticate3rdParty error: ', e);
                          }
                        );
                    case 3:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t, a) {
            return e.apply(this, arguments);
          };
        })(),
        l = (function() {
          var e = Object(i.a)(
            r.a.mark(function e(t, a) {
              var n;
              return r.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      (n = {
                        authCode: t.code,
                        state: t.state,
                        redirectUri: t.redirectUri,
                      }),
                        console.log('request', n),
                        Object(s.b)(
                          s.a.AUTHENTICATE_LINKEDIN,
                          n,
                          function(e) {
                            a(e),
                              console.log(
                                'Call getTokenWithLinkedIn success: ',
                                e
                              );
                          },
                          function(e) {
                            console.log('Call getTokenWithLinkedIn error: ', e);
                          }
                        );
                    case 3:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t, a) {
            return e.apply(this, arguments);
          };
        })();
    },
    358: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(9),
        o = a(136),
        s = a(83),
        c = a(181),
        l = a(463);
      t.default = function(e) {
        var t = e.type,
          a = e.isLoading,
          n = e.email,
          u = e.backHandler,
          d = e.firstName,
          m = e.GTeventHandler,
          p = e.onSignupRoute,
          g = e.changeHandler;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(o.default, {
            isLoading: a,
            email: n,
            backHandler: u,
          }),
          r.a.createElement(s.default, { greeting: 'Welcome back', name: d }),
          r.a.createElement(
            i.a,
            { variant: 'body2', style: { marginBottom: 10 } },
            'It looks like your account was created with ',
            t,
            '.'
          ),
          'Google' === t
            ? r.a.createElement(c.default, {
                disabled: a,
                key: 'google-button',
                id: 'google-button',
                GTevent: m,
                action: p ? 'Sign up' : 'Sign in',
                changeHandler: g,
              })
            : null,
          'LinkedIn' === t
            ? r.a.createElement(l.default, {
                disabled: a,
                key: 'linkedin-button',
                id: 'linkedin-button',
                action: p ? 'Sign up' : 'Sign in',
                changeHandler: g,
              })
            : null
        );
      };
    },
    359: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(692),
        o = a.n(i),
        s = a(9),
        c = a(7),
        l = a.n(c),
        u = a(281);
      t.default = l()(function(e) {
        return {
          doneIcon: { fontSize: 120, color: '#00E676' },
          message: {
            textAlign: 'center',
            textTransform: 'none',
            marginTop: 10,
            marginBottom: 40,
          },
          link: {
            color: e.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.message,
          n = e.destination,
          i = e.destinationName;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(o.a, { className: t.doneIcon }),
          r.a.createElement(s.a, { variant: 'h6', className: t.message }, a),
          r.a.createElement(u.a, { href: n, className: t.link }, 'Go to ', i)
        );
      });
    },
    369: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(391),
        o = a(734),
        s = a(509),
        c = a(192);
      t.default = function(e) {
        var t = e.classes,
          a = e.data,
          n = e.selected,
          l = e.goTo;
        switch (a.type) {
          case 'divider':
            return r.a.createElement(c.a, { className: t.divider });
          case 'link':
            return r.a.createElement(
              i.a,
              {
                button: !0,
                component: 'a',
                id: a.label.split(' ')[0],
                href: a.href,
                target: '_blank',
                rel: 'noopener noreferrer',
                classes: { root: t.listItemRoot },
                className: n ? t.selected : '',
                disabled: a.disabled,
              },
              r.a.createElement(
                o.a,
                { classes: { root: t.listItemIconRoot } },
                a.icon
              ),
              r.a.createElement(s.a, {
                primary: a.label,
                classes: { root: t.listItemTextRoot },
              })
            );
          default:
            return r.a.createElement(
              i.a,
              {
                button: !0,
                id: a.label.replace(/ /g, '').toLowerCase(),
                onClick: a.onClick
                  ? a.onClick
                  : function() {
                      l(a.route);
                    },
                classes: { root: t.listItemRoot },
                className: n ? t.selected : '',
                disabled: a.disabled,
              },
              r.a.createElement(
                o.a,
                { classes: { root: t.listItemIconRoot } },
                a.icon
              ),
              r.a.createElement(s.a, {
                primary: a.label,
                classes: { root: t.listItemTextRoot },
              })
            );
        }
      };
    },
    370: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(16),
        s = a.n(o),
        c = a(64),
        l = a(7),
        u = a.n(l),
        d = a(11),
        m = a(9),
        p = a(36);
      t.default = Object(c.a)(
        u()(function(e) {
          return {
            root: Object(n.a)(
              { padding: e.spacing(1) },
              e.breakpoints.down('xs'),
              { paddingLeft: e.spacing(2) }
            ),
            clickable: {
              cursor: 'pointer',
              '&:hover $title': { color: e.palette.primary.main },
              '&:hover $icon': { color: e.palette.primary.main },
            },
            icon: {
              fontSize: 32,
              opacity: 0.87,
              marginRight: e.spacing(1.5),
              verticalAlign: 'bottom',
              transition: e.transitions.create(['color', 'background-color'], {
                duration: e.transitions.duration.short,
              }),
            },
            title: {
              cursor: 'default',
              fontWeight: 500,
              '$clickable &': {
                cursor: 'pointer',
                transition: e.transitions.create('color', {
                  duration: e.transitions.duration.short,
                }),
              },
            },
            viewAllButton: { marginRight: -e.spacing(1) / 4 },
          };
        })(function(e) {
          var t = e.classes,
            a = e.history,
            n = e.title,
            r = e.route,
            o = e.Icon,
            c = e.usedYourBackup;
          return i.a.createElement(
            d.a,
            {
              container: !0,
              wrap: 'nowrap',
              alignItems: 'center',
              className: s()(t.root, r && t.clickable),
              onClick: r
                ? function() {
                    a.push(r);
                  }
                : null,
            },
            o &&
              i.a.createElement(
                d.a,
                { item: !0 },
                i.a.createElement(o, { className: t.icon })
              ),
            i.a.createElement(
              d.a,
              { item: !0, xs: !0 },
              i.a.createElement(
                m.a,
                { variant: 'h5', className: t.title },
                c && 'Your ',
                n
              )
            ),
            r &&
              i.a.createElement(
                d.a,
                { item: !0 },
                i.a.createElement(
                  p.a,
                  {
                    variant: 'outlined',
                    color: 'primary',
                    className: t.viewAllButton,
                  },
                  'View all'
                )
              )
          );
        })
      );
    },
    371: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'course', function() {
          return x;
        }),
        a.d(t, 'assessment', function() {
          return j;
        }),
        a.d(t, 'job', function() {
          return S;
        }),
        a.d(t, 'event', function() {
          return N;
        });
      var n = a(0),
        r = a.n(n),
        i = a(31),
        o = a.n(i),
        s = a(108),
        c = a.n(s),
        l = a(100),
        u = a(107),
        d = a.n(u),
        m = a(374),
        p = a.n(m),
        g = a(347),
        h = a.n(g),
        f = a(483),
        b = a(372),
        E = a(373),
        y = a(13),
        v = a(5);
      o.a.updateLocale('en', v.MOMENT_LOCALES);
      var x = function(e) {
          var t = null,
            a = '';
          return (
            !1 === e.completed
              ? ((t = r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(d.a, null),
                  'Incomplete'
                )),
                (a = 'orange'))
              : !0 === e.completed &&
                ((t = r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(h.a, null),
                  'Completed'
                )),
                (a = 'green')),
            {
              title: e.title,
              secondaryText: r.a.createElement(f.default, { data: e }),
              primaryAction: e.hasOwnProperty('completed')
                ? e.completed
                  ? 'View'
                  : 'Continue'
                : 'Get started',
              route: ''.concat(y.d, '?id=').concat(e.LWid),
              newTab: !0,
              banner: t,
              bannerColor: a,
              video: e.videoUrl,
            }
          );
        },
        j = function(e) {
          var t = 'Get started',
            a = null,
            n = '';
          return (
            e.assessmentId &&
              (e.submitted
                ? 'pass' === e.outcome
                  ? ((t = 'View submission'),
                    (a = r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(l.a, null),
                      'Passed',
                      r.a.createElement(
                        'small',
                        null,
                        o.a.unix(e.updatedAt.seconds).fromNow()
                      )
                    )),
                    (n = 'green'))
                  : 'fail' === e.outcome
                  ? ((t = e.resubmitted ? 'View' : 'Resubmit'),
                    (a = r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(d.a, null),
                      'Unsuccessful',
                      r.a.createElement(
                        'small',
                        null,
                        o.a.unix(e.updatedAt.seconds).fromNow()
                      )
                    )),
                    (n = 'orange'))
                  : 'disqualify' === e.outcome
                  ? ((t = e.resubmitted ? 'View' : 'Resubmit'),
                    (a = r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(p.a, null),
                      'Disqualified',
                      r.a.createElement(
                        'small',
                        null,
                        o.a.unix(e.updatedAt.seconds).fromNow()
                      )
                    )),
                    (n = 'red'))
                  : ((t = 'View submission'),
                    (a = r.a.createElement(
                      r.a.Fragment,
                      null,
                      r.a.createElement(c.a, null),
                      'Submitted',
                      r.a.createElement(
                        'small',
                        null,
                        o.a.unix(e.updatedAt.seconds).fromNow()
                      )
                    )))
                : ((t = 'Complete submission'),
                  (a = r.a.createElement(
                    r.a.Fragment,
                    null,
                    r.a.createElement(d.a, null),
                    'Incomplete',
                    r.a.createElement(
                      'small',
                      null,
                      o.a.unix(e.updatedAt.seconds).fromNow()
                    )
                  )))),
            {
              title: e.title,
              meta: r.a.createElement(b.AssessmentMeta, { data: e }),
              secondaryText: r.a.createElement(b.default, { data: e }),
              primaryAction: t,
              route: ''
                .concat(y.a, '?id=')
                .concat(e.id)
                .concat(e.assessmentId ? '&yours=true' : ''),
              banner: a,
              bannerColor: n,
              image: e.image && e.image.url,
            }
          );
        },
        S = function(e) {
          var t = null,
            a = '',
            n = o.a.unix(e.closingDate.seconds).diff(o()(), 'days');
          return (
            e.jobId
              ? (t = r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(c.a, null),
                  'Applied'
                ))
              : n < 0
              ? (t = r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(d.a, null),
                  'Applications Closed'
                ))
              : n < 3 &&
                ((t = r.a.createElement(
                  r.a.Fragment,
                  null,
                  r.a.createElement(d.a, null),
                  'Closing Soon',
                  r.a.createElement(
                    'small',
                    null,
                    n > 1 ? ''.concat(n, ' days') : 'Last day'
                  )
                )),
                (a = 'orange')),
            {
              title: e.title,
              meta: r.a.createElement(E.JobMeta, { data: e }),
              secondaryText: r.a.createElement(E.default, { data: e }),
              primaryAction: e.jobId ? 'View' : 'Learn more',
              route: ''
                .concat(y.h, '?id=')
                .concat(e.id)
                .concat(e.jobId ? '&yours=true' : ''),
              banner: t,
              bannerColor: a,
              image: e.image && e.image.url,
            }
          );
        },
        N = function(e) {
          return {
            title: e.title,
            secondaryText: e.description,
            primaryAction: 'Do the thing',
            route: ''.concat(y.g, '?id=').concat(e.id),
            tertiaryText: [
              'Starts '.concat(e.startDateTime),
              'Ends '.concat(e.endDateTime),
            ],
            image: e.image && e.image.url,
          };
        };
    },
    372: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'AssessmentMeta', function() {
          return b;
        });
      var n = a(14),
        r = a(0),
        i = a.n(r),
        o = a(16),
        s = a.n(o),
        c = a(7),
        l = a.n(c),
        u = a(11),
        d = a(9),
        m = a(220),
        p = a.n(m),
        g = a(179),
        h = a(5),
        f = function(e) {
          return Object(n.a)({}, h.STYLES.RENDERED_HTML(e), {
            timeWrapper: {
              marginTop: -e.spacing(1),
              marginBottom: e.spacing(1.5),
              width: 'auto',
            },
            timeIcon: {
              marginRight: e.spacing(0.5),
              color: e.palette.text.secondary,
            },
            description: Object(n.a)({}, e.typography.body2, {
              lineClamp: 4,
              display: 'box',
              boxOrient: 'vertical',
              overflow: 'hidden',
            }),
          });
        },
        b = l()(f)(function(e) {
          var t = e.classes,
            a = e.data;
          return i.a.createElement(
            i.a.Fragment,
            null,
            i.a.createElement(g.default, { value: a.category }),
            i.a.createElement(
              u.a,
              {
                container: !0,
                alignItems: 'flex-end',
                className: t.timeWrapper,
              },
              i.a.createElement(p.a, { className: t.timeIcon }),
              i.a.createElement(
                d.a,
                { variant: 'body1', color: 'textSecondary' },
                a.duration
              )
            )
          );
        });
      t.default = l()(f)(function(e) {
        var t = e.classes,
          a = e.data;
        return i.a.createElement('div', {
          className: s()(t.renderedHtml, t.description),
          dangerouslySetInnerHTML: {
            __html: a.briefing
              ? ''
                  .concat(a.briefing.substr(0, 180))
                  .concat(a.briefing.length > 180 ? '\u2026' : '')
              : ''
                  .concat(a.jobDescription.substr(0, 180))
                  .concat(a.jobDescription.length > 180 ? '\u2026' : ''),
          },
        });
      });
    },
    373: function(e, t, a) {
      'use strict';
      a.r(t),
        a.d(t, 'JobMeta', function() {
          return m;
        });
      var n = a(14),
        r = a(0),
        i = a.n(r),
        o = a(7),
        s = a.n(o),
        c = a(9),
        l = a(179),
        u = a(265),
        d = a(89),
        m = function(e) {
          var t = e.data;
          return i.a.createElement(l.default, { value: t.industry });
        };
      t.default = s()(function(e) {
        return {
          description: Object(n.a)({}, e.typography.body2, {
            lineClamp: 4,
            display: 'box',
            boxOrient: 'vertical',
            overflow: 'hidden',
          }),
        };
      })(function(e) {
        var t = e.classes,
          a = e.data;
        return i.a.createElement(
          i.a.Fragment,
          null,
          i.a.createElement(
            c.a,
            { variant: 'body2', className: t.description },
            Object(d.f)(
              a.companyDescription.replace('</p>', '\n').replace('&nbsp;', '')
            )
          ),
          a.skillsRequired &&
            i.a.createElement(u.default, { values: a.skillsRequired })
        );
      });
    },
    375: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(391),
        c = a(509),
        l = a(11),
        u = a(165),
        d = a(9),
        m = a(36),
        p = a(80),
        g = a.n(p),
        h = a(484),
        f = a(31),
        b = a.n(f),
        E = a(5);
      t.default = o()(function(e) {
        return {
          listItemRoot: {
            alignItems: 'flex-start',
            cursor: 'default',
            marginBottom: e.spacing(1),
          },
          listItemTextRoot: { paddingRight: 0 },
          activityTitle: { lineHeight: '1.25', marginBottom: e.spacing(0.5) },
          timestamp: {
            color: e.palette.text.secondary,
            marginLeft: e.spacing(1.5),
          },
          activityLogLabel: { color: e.palette.text.secondary },
          unread: {
            color: e.palette.common.white,
            backgroundColor: e.palette.primary.main,
          },
          ctaButton: {
            marginTop: e.spacing(0.5),
            marginLeft: 2 * -e.spacing(1),
            '& svg': {
              margin: 0,
              marginLeft: e.spacing(0.5),
              marginRight: -e.spacing(1) / 2,
            },
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.data,
          n = e.handleClick;
        return r.a.createElement(
          s.a,
          { classes: { root: t.listItemRoot } },
          r.a.createElement(
            u.a,
            null,
            r.a.createElement(h.default, { type: a.type })
          ),
          r.a.createElement(c.a, {
            primary: r.a.createElement(
              l.a,
              {
                container: !0,
                justify: 'space-between',
                alignItems: 'baseline',
              },
              r.a.createElement(
                l.a,
                { item: !0, xs: !0 },
                r.a.createElement(
                  d.a,
                  { variant: 'subtitle1', className: t.activityTitle },
                  a.title
                )
              ),
              r.a.createElement(
                l.a,
                null,
                r.a.createElement(
                  d.a,
                  { variant: 'body2', className: t.timestamp },
                  b.a.unix(a.createdAt.seconds).fromNow()
                )
              )
            ),
            secondary: r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(
                d.a,
                { className: t.activityLogLabel },
                a.body || E.ACTIVITY_LOG_LABELS[a.type]
              ),
              a.cta &&
                a.cta.label &&
                a.cta.route &&
                r.a.createElement(
                  m.a,
                  {
                    variant: 'contained',
                    color: 'primary',
                    onClick: function() {
                      n(a.cta.route);
                    },
                    className: t.ctaButton,
                  },
                  a.cta.label,
                  r.a.createElement(g.a, null)
                )
            ),
            classes: { root: t.listItemTextRoot },
            disableTypography: !0,
          })
        );
      });
    },
    376: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(17),
        i = a(14),
        o = a(0),
        s = a.n(o),
        c = a(16),
        l = a.n(c),
        u = a(7),
        d = a.n(u),
        m = a(9),
        p = a(511),
        g = a(279),
        h = a(280),
        f = a(36),
        b = a(156),
        E = a.n(b),
        y = a(157),
        v = a.n(y),
        x = a(721),
        j = a.n(x),
        S = a(722),
        N = a.n(S),
        k = a(160),
        O = a(720),
        w = a.n(O),
        C = (a(1646), a(5)),
        T = a(161),
        _ = a(89);
      t.default = d()(function(e) {
        return Object(
          i.a
        )({ root: { margin: ''.concat(e.spacing(4), 'px 0') } }, C.STYLES.RENDERED_HTML(e), { answerInputWrapper: { marginTop: e.spacing(2) }, quillEditor: Object(i.a)({}, C.STYLES.QUILL(e)) }, C.STYLES.DROPZONE(e), { mcEmailButton: { verticalAlign: 'baseline', marginLeft: e.spacing(1) }, previewSubtitle: { marginTop: e.spacing(2) }, linearProgress: { marginTop: e.spacing(1) }, paddedIcon: Object(r.a)({ marginLeft: -e.spacing(1) / 2, marginRight: e.spacing(1.5) }, e.breakpoints.up('lg'), { marginLeft: -60 }) });
      })(function(e) {
        var t = e.classes,
          a = e.questionNum,
          r = e.questionText,
          i = e.submissionType,
          c = e.mcEmail,
          u = e.answer,
          d = e.setAnswer,
          b = e.user,
          y = e.readOnly,
          x = e.smartLink,
          S = Object(o.useState)(''),
          O = Object(n.a)(S, 2),
          C = O[0],
          L = O[1],
          I = null;
        switch (i) {
          case 'pdf':
          case 'zip':
            I = s.a.createElement(
              s.a.Fragment,
              null,
              !y &&
                s.a.createElement(
                  k.a,
                  {
                    onDrop: function(e, t) {
                      console.log('dropzone', e, t),
                        t.length > 0 && L(t[0].name),
                        e.length > 0 &&
                          (d({ name: e[0].name || 'submission' }),
                          Object(T.b)(
                            'submissions/'
                              .concat(b.id, '/')
                              .concat(new Date(), '/')
                              .concat(e[0].name),
                            e[0],
                            function(e, t) {
                              d({ name: t.name, url: e });
                            }
                          ));
                    },
                    accept:
                      'pdf' === i
                        ? 'application/pdf'
                        : ['application/zip', 'application/x-zip-compressed'],
                  },
                  function(e) {
                    var a = e.getRootProps,
                      n = e.getInputProps,
                      r = e.isDragActive;
                    return s.a.createElement(
                      'div',
                      Object.assign({}, a(), {
                        className: l()(t.dropzone, r && t.dropzoneDragActive),
                      }),
                      s.a.createElement('input', n()),
                      s.a.createElement(E.a, { className: t.uploadIcon }),
                      s.a.createElement(
                        m.a,
                        { variant: 'body1' },
                        r
                          ? 'Drop your '.concat(i.toUpperCase(), ' here!')
                          : 'Drag a '.concat(i.toUpperCase(), ' file here or')
                      ),
                      s.a.createElement(
                        f.a,
                        {
                          color: 'primary',
                          variant: 'outlined',
                          className: t.dropzoneButton,
                          size: 'small',
                        },
                        'Click to select a ',
                        i.toUpperCase(),
                        ' file'
                      ),
                      C &&
                        s.a.createElement(
                          m.a,
                          { variant: 'body2', color: 'error' },
                          C,
                          ' is invalid'
                        )
                    );
                  }
                ),
              u &&
                s.a.createElement(p.a, {
                  component: 'a',
                  href: u.url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  label: u.name,
                  onDelete: y
                    ? null
                    : function(e) {
                        e.preventDefault(), d(null);
                      },
                  className: t.fileChip,
                  icon: u.url
                    ? s.a.createElement(v.a, { className: t.fileIcon })
                    : s.a.createElement(g.a, { size: 24 }),
                })
            );
            break;
          case 'richText':
            I = s.a.createElement(w.a, {
              readOnly: y,
              placeholder: 'Type your answer here\u2026',
              value: u || '',
              onChange: function(e) {
                d(e);
              },
              theme: 'snow',
              className: t.quillEditor,
              preserveWhiteSpace: !0,
              modules: {
                toolbar: [
                  ['bold', 'italic', 'underline'],
                  [{ header: 1 }, { header: 2 }],
                  [{ list: 'bullet' }, { list: 'ordered' }],
                  [{ indent: '-1' }, { indent: '+1' }],
                  ['link'],
                ],
              },
            });
            break;
          case 'mailchimp':
            I = s.a.createElement(
              s.a.Fragment,
              null,
              s.a.createElement(
                m.a,
                { variant: 'body1' },
                'Send your email to ',
                s.a.createElement('strong', null, c),
                s.a.createElement(
                  f.a,
                  {
                    variant: 'outlined',
                    color: 'primary',
                    className: t.mcEmailButton,
                    onClick: function() {
                      Object(_.b)(c),
                        alert('Copied to '.concat(c, ' clipboard'));
                    },
                  },
                  'Copy',
                  s.a.createElement(j.a, null)
                )
              ),
              s.a.createElement(
                m.a,
                { variant: 'subtitle1', className: t.previewSubtitle },
                'Email preview'
              ),
              u
                ? s.a.createElement('div', {
                    className: t.renderedHtmlOriginal,
                    dangerouslySetInnerHTML: { __html: u.body },
                  })
                : s.a.createElement(
                    m.a,
                    { variant: 'body1' },
                    'Your email will appear here when we receive it.'
                  )
            );
            break;
          case 'ideo':
            I =
              x && x.key && x.secret
                ? s.a.createElement(
                    s.a.Fragment,
                    null,
                    s.a.createElement(
                      m.a,
                      { variant: 'body1', style: { marginBottom: '1em' } },
                      'Write your code using our ',
                      s.a.createElement('b', null, 'code editor'),
                      ', where you can make changes in real time and submit with one click. No need for uploading ZIPs or creating GitHub repositories.'
                    ),
                    s.a.createElement(
                      f.a,
                      {
                        variant: 'contained',
                        color: 'primary',
                        component: 'a',
                        href: 'https://'
                          .concat('ide.2hats.com', '/?slKey=')
                          .concat(x.key, '&slSecret=')
                          .concat(x.secret),
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        size: 'large',
                        className: t.getStartedButton,
                      },
                      'Open in new tab',
                      s.a.createElement(N.a, null)
                    )
                  )
                : s.a.createElement(
                    s.a.Fragment,
                    null,
                    s.a.createElement(
                      m.a,
                      { variant: 'body1' },
                      'Generating link\u2026'
                    ),
                    s.a.createElement(h.a, { className: t.linearProgress })
                  );
            break;
          default:
            I = null;
        }
        return s.a.createElement(
          'div',
          { className: t.root },
          s.a.createElement(
            m.a,
            { variant: 'h6', gutterBottom: !0 },
            a > 0 ? 'Question '.concat(a) : 'Submission'
          ),
          s.a.createElement('div', {
            className: t.renderedHtml,
            dangerouslySetInnerHTML: {
              __html: Object(_.e)(r, '{{firstName}}', b.firstName),
            },
          }),
          s.a.createElement('div', { className: t.answerInputWrapper }, I)
        );
      });
    },
    378: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(31),
        s = a.n(o),
        c = a(7),
        l = a.n(c),
        u = a(11),
        d = a(9),
        m = a(219),
        p = a.n(m),
        g = a(232),
        h = a.n(g);
      t.default = l()(function(e) {
        return {
          subtitle: {
            textAlign: 'center',
            textTransform: 'capitalize',
            color: e.palette.text.primary,
            marginTop: e.spacing(1),
            marginBottom: ''.concat(e.spacing(3), 'px !important'),
            display: 'block',
            '& $adornmentIcon': {
              verticalAlign: 'baseline',
              color: e.palette.text.primary,
              marginBottom: -4,
            },
          },
          grid: { textAlign: 'center', marginTop: e.spacing(1) },
          gridItem: {
            paddingTop: '0 !important',
            paddingBottom: '0 !important',
          },
          meta: {
            fontWeight: 500,
            marginBottom: 0,
            '& small': { verticalAlign: 'text-top', fontSize: '.75em' },
          },
          adornmentIcon: {
            verticalAlign: 'bottom',
            marginRight: e.spacing(1),
            color: e.palette.text.secondary,
          },
          warningIcon: Object(n.a)(
            {
              fontSize: 28,
              verticalAlign: 'text-bottom',
              marginLeft: -e.spacing(1) / 2,
              marginRight: e.spacing(1),
            },
            e.breakpoints.down('sm'),
            { fontSize: 24, marginRight: e.spacing(0.5) }
          ),
        };
      })(function(e) {
        var t = e.classes,
          a = e.data,
          n = e.isXs,
          r = e.small,
          o = s.a.unix(a.closingDate.seconds).diff(s()(), 'days'),
          c = o < 0,
          l = o <= 3;
        return i.a.createElement(
          i.a.Fragment,
          null,
          i.a.createElement(
            d.a,
            { variant: n || r ? 'subtitle1' : 'h6', className: t.subtitle },
            i.a.createElement(p.a, { className: t.adornmentIcon }),
            a.industry
          ),
          i.a.createElement(
            u.a,
            { container: !0, className: t.grid, spacing: 2, justify: 'center' },
            i.a.createElement(
              u.a,
              { item: !0, xs: 4, className: t.gridItem },
              i.a.createElement(
                d.a,
                { variant: n || r ? 'h6' : 'h5', className: t.meta },
                a.commitment
              ),
              i.a.createElement(
                d.a,
                { variant: n || r ? 'body2' : 'body1' },
                a.commitmentUnits
              )
            ),
            i.a.createElement(
              u.a,
              { item: !0, xs: 4, className: t.gridItem },
              i.a.createElement(
                d.a,
                { variant: n || r ? 'h6' : 'h5', className: t.meta },
                i.a.createElement('small', null, '$'),
                a.payRate
              ),
              i.a.createElement(
                d.a,
                { variant: n || r ? 'body2' : 'body1' },
                a.payUnits
              )
            ),
            i.a.createElement(
              u.a,
              { item: !0, xs: 4, className: t.gridItem },
              c
                ? i.a.createElement(
                    i.a.Fragment,
                    null,
                    i.a.createElement(
                      d.a,
                      { variant: n || r ? 'h6' : 'h5', className: t.meta },
                      'Closed'
                    ),
                    i.a.createElement(
                      d.a,
                      { variant: n || r ? 'body2' : 'body1' },
                      'for applications'
                    )
                  )
                : i.a.createElement(
                    i.a.Fragment,
                    null,
                    i.a.createElement(
                      d.a,
                      {
                        variant: n || r ? 'h6' : 'h5',
                        className: t.meta,
                        color: l ? 'primary' : 'textPrimary',
                      },
                      l && i.a.createElement(h.a, { className: t.warningIcon }),
                      o > 1 ? ''.concat(o, ' days') : 'Last day'
                    ),
                    i.a.createElement(
                      d.a,
                      { variant: n || r ? 'body2' : 'body1' },
                      o > 1 && 'left',
                      ' to apply'
                    )
                  )
            )
          )
        );
      });
    },
    379: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(31),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(36),
        u = a(512),
        d = a(11),
        m = a(279),
        p = a(80),
        g = a.n(p),
        h = a(232),
        f = a.n(h),
        b = a(724),
        E = a.n(b),
        y = a(59);
      t.default = c()(function(e) {
        return {
          apply: {
            marginTop: e.spacing(2),
            padding: ''
              .concat(e.spacing(1), 'px ')
              .concat(e.spacing(2.5), 'px'),
            '& svg': {
              marginLeft: e.spacing(0.5),
              marginRight: -e.spacing(1) / 2,
            },
          },
          applyBig: {
            display: 'flex',
            margin: '0 auto',
            borderRadius: 200,
            '& svg': {
              marginLeft: e.spacing(0.5),
              marginRight: -e.spacing(1) / 2,
              position: 'relative',
              top: 1,
            },
          },
          tooltipIconWrapper: { height: 24 },
          tooltipText: {
            fontSize: '.875rem',
            lineHeight: 1.25,
            margin: e.spacing(0.5),
            marginLeft: e.spacing(1),
          },
          loading: {
            position: 'absolute',
            '& svg': { margin: 0, position: 'static' },
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.onClick,
          i = e.data,
          s = e.skillsNotAchieved,
          c = e.loading,
          p = e.big,
          h = o.a.unix(i.closingDate.seconds).diff(o()(), 'days') < 0,
          b = Object(n.useContext)(y.a).user,
          v = !!i.jobId || (b.touchedJobs && b.touchedJobs.indexOf(i.id) > -1);
        return h & !v
          ? r.a.createElement(
              u.a,
              {
                title: r.a.createElement(
                  d.a,
                  { container: !0, alignItems: 'center' },
                  r.a.createElement(
                    d.a,
                    { item: !0, className: t.tooltipIconWrapper },
                    r.a.createElement(f.a, null)
                  ),
                  r.a.createElement(
                    d.a,
                    {
                      item: !0,
                      xs: !0,
                      className: t.tooltipText,
                      style: { maxWidth: 175 },
                    },
                    'We are no longer accepting applications for this job'
                  )
                ),
              },
              r.a.createElement(
                'div',
                null,
                r.a.createElement(
                  l.a,
                  {
                    variant: 'outlined',
                    color: 'primary',
                    className: p ? t.applyBig : t.apply,
                    size: p ? 'large' : 'medium',
                    onClick: a,
                    disabled: !0,
                  },
                  'Applications Closed',
                  r.a.createElement(f.a, null)
                )
              )
            )
          : s.length > 0
          ? r.a.createElement(
              u.a,
              {
                title: r.a.createElement(
                  d.a,
                  { container: !0, alignItems: 'center' },
                  r.a.createElement(
                    d.a,
                    { item: !0, className: t.tooltipIconWrapper },
                    r.a.createElement(f.a, null)
                  ),
                  r.a.createElement(
                    d.a,
                    {
                      item: !0,
                      xs: !0,
                      className: t.tooltipText,
                      style: { maxWidth: 150 },
                    },
                    'You need ',
                    s.length,
                    ' more of the required skills to apply'
                  )
                ),
              },
              r.a.createElement(
                'div',
                null,
                r.a.createElement(
                  l.a,
                  {
                    variant: 'outlined',
                    color: 'primary',
                    className: p ? t.applyBig : t.apply,
                    size: p ? 'large' : 'medium',
                    onClick: a,
                    disabled: !0,
                  },
                  'Apply',
                  r.a.createElement(g.a, null)
                )
              )
            )
          : r.a.createElement(
              l.a,
              {
                variant: i.jobId || c ? 'outlined' : 'contained',
                color: 'primary',
                className: p ? t.applyBig : t.apply,
                size: p ? 'large' : 'medium',
                onClick: a,
                disabled: c || v,
              },
              c && r.a.createElement(m.a, { className: t.loading, size: 32 }),
              v
                ? r.a.createElement(
                    r.a.Fragment,
                    null,
                    'Applied',
                    r.a.createElement(E.a, null)
                  )
                : r.a.createElement(
                    r.a.Fragment,
                    null,
                    'Apply',
                    r.a.createElement(g.a, null)
                  )
            );
      });
    },
    40: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(14),
        r = a(12),
        i = a(0),
        o = a.n(i),
        s = a(16),
        c = a.n(s),
        l = a(7),
        u = a.n(l),
        d = a(11),
        m = a(9),
        p = a(36),
        g = a(714),
        h = a.n(g),
        f = a(370),
        b = a(141),
        E = a(58),
        y = a(116),
        v = function(e, t, a) {
          var o = Object(y.a)(Object(n.a)({ limit: t }, e)),
            s = Object(r.a)(o, 2),
            c = s[0],
            l = s[1],
            u = Object(i.useState)([]),
            d = Object(r.a)(u, 2),
            m = d[0],
            p = d[1],
            g = Object(i.useState)(t),
            h = Object(r.a)(g, 2),
            f = h[0],
            b = h[1],
            E = Object(i.useState)(a),
            v = Object(r.a)(E, 2),
            x = v[0],
            j = v[1];
          return (
            Object(i.useEffect)(
              function() {
                m.length < f && l({ type: 'more' });
              },
              [f]
            ),
            Object(i.useEffect)(
              function() {
                c.documents &&
                  (Array.isArray(x)
                    ? p(
                        c.documents.filter(function(e) {
                          return !x.includes(e.id);
                        })
                      )
                    : p(c.documents));
              },
              [f, c.documents]
            ),
            [
              m.slice(0, f),
              function(e) {
                e > 0 && b(f + e);
              },
              j,
              c,
              l,
            ]
          );
        },
        x = a(5),
        j = a(371);
      a.d(t, 'getNumCards', function() {
        return S;
      }),
        a.d(t, 'getCardsWidth', function() {
          return N;
        });
      var S = function(e, t) {
          var a = t ? 0 : E.DRAWER_WIDTH,
            n = Math.floor(
              (e - a - b.CARD_PADDING) / (b.CARD_WIDTH + b.CARD_PADDING)
            );
          return n > 3 ? 3 : n < 1 ? 1 : n;
        },
        N = function(e) {
          return 320 * e + 16 * e;
        };
      t.default = u()(function(e) {
        return {
          root: {
            boxSizing: 'border-box',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: e.spacing(5),
            maxWidth: '100vw',
            userSelect: 'none',
          },
          inline: { display: 'inline-block' },
          moreButton: {
            margin: e.spacing(1),
            '& svg': { marginLeft: e.spacing(0.25) },
          },
          noneLeftWrapper: { marginBottom: e.spacing(2) },
          noneLeftIcon: {
            fontSize: 35,
            color: e.palette.text.disabled,
            marginLeft: e.spacing(1),
          },
          noneLeftMsg: {
            color: e.palette.text.disabled,
            marginLeft: e.spacing(2),
            fontWeight: 700,
            lineHeight: 1.4,
            maxWidth: 260,
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.cols,
          s = e.title,
          l = e.Icon,
          u = e.route,
          g = e.NoneLeftIcon,
          E = e.noneLeftMsg,
          y = e.useCollectionInit,
          k = e.mapping,
          O = e.mappingOverrides,
          w = e.filterIds,
          C = e.yourBackup,
          T = e.inline,
          _ = e.hideMore,
          L = e.extra,
          I = Object(i.useState)(1),
          A = Object(r.a)(I, 2),
          R = A[0],
          P = A[1],
          B = Object(i.useState)(!1),
          W = Object(r.a)(B, 2),
          D = W[0],
          q = W[1],
          M = a;
        L && (2 === a && (M = 4), a <= 1 && (M = 3));
        var H = v(y, M, w),
          F = Object(r.a)(H, 5),
          U = F[0],
          z = F[1],
          G = F[2],
          $ = F[3],
          Y = F[4];
        return (
          Object(i.useEffect)(
            function() {
              G(w);
            },
            [w]
          ),
          $.loading ||
            0 !== U.length ||
            !C ||
            D ||
            (Y({
              path: ''
                .concat(x.COLLECTIONS.users, '/')
                .concat(C, '/')
                .concat(y.path),
            }),
            G([]),
            q(!0)),
          !$.loading && 0 === U.length && E
            ? o.a.createElement(
                'div',
                {
                  className: c()(t.root, T && t.inline),
                  style: { width: Math.min(N(a), N(S(window.innerWidth))) },
                },
                o.a.createElement(f.default, {
                  title: s,
                  route: u,
                  Icon: l,
                  usedYourBackup: D,
                }),
                o.a.createElement(
                  d.a,
                  {
                    container: !0,
                    alignItems: 'center',
                    className: t.noneLeftWrapper,
                  },
                  g && o.a.createElement(g, { className: t.noneLeftIcon }),
                  o.a.createElement(
                    m.a,
                    { variant: 'subtitle1', className: t.noneLeftMsg },
                    E
                  )
                )
              )
            : U.length > 0
            ? o.a.createElement(
                'div',
                {
                  className: c()(t.root, T && t.inline),
                  style: { width: Math.min(N(a), N(S(window.innerWidth))) },
                },
                o.a.createElement(f.default, {
                  title: s,
                  route: u,
                  Icon: l,
                  usedYourBackup: D,
                }),
                o.a.createElement(
                  d.a,
                  { container: !0 },
                  U &&
                    U.map(function(e, t) {
                      return o.a.createElement(
                        b.default,
                        Object.assign({ key: t }, j[k](Object(n.a)({}, e, O)))
                      );
                    })
                ),
                !_ &&
                  U.length >= M * R &&
                  o.a.createElement(
                    p.a,
                    {
                      color: 'primary',
                      variant: 'outlined',
                      className: t.moreButton,
                      disabled: U.length < M * R,
                      onClick: function() {
                        P(R + 1), z(M);
                      },
                    },
                    'More',
                    o.a.createElement(h.a, { className: t.moreIcon })
                  )
              )
            : null
        );
      });
    },
    41: function(e, t, a) {
      'use strict';
      a.d(t, 'a', function() {
        return n;
      }),
        a.d(t, 'b', function() {
          return r;
        });
      var n = {
          noPassword: 'noPassword',
          validateEmail: 'validateEmail',
          auth: 'auth',
          google: 'google',
          linkedin: 'linkedin',
          password: 'password',
          magic: 'magic',
          signup: 'signup',
          logout: 'logout',
          resetPassword: 'resetPassword',
          createPassword: 'createPassword',
          intro: 'intro',
        },
        r = { form: 'form', success: 'success' };
    },
    45: function(e, t, a) {
      'use strict';
      a.d(t, 'd', function() {
        return u;
      }),
        a.d(t, 'c', function() {
          return d;
        }),
        a.d(t, 'a', function() {
          return m;
        }),
        a.d(t, 'b', function() {
          return p;
        });
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(14),
        s = a(33),
        c = a(90),
        l = a.n(c),
        u = function(e, t, a) {
          return s.c
            .collection(e)
            .doc(t)
            .update(
              Object(o.a)({}, a, {
                updatedAt: l.a.firestore.FieldValue.serverTimestamp(),
              })
            );
        },
        d = (function() {
          var e = Object(i.a)(
            r.a.mark(function e(t, a, n) {
              var i, o;
              return r.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (i = s.c.collection(t)),
                        a.forEach(function(e) {
                          i = i.where(e.field, e.operator, e.value);
                        }),
                        n.forEach(function(e) {
                          i = i.orderBy(e.field, e.direction || 'asc');
                        }),
                        (e.next = 5),
                        i.get()
                      );
                    case 5:
                      if (!(o = e.sent).empty) {
                        e.next = 10;
                        break;
                      }
                      return e.abrupt('return', !1);
                    case 10:
                      return e.abrupt('return', o.docs[0].id);
                    case 11:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t, a, n) {
            return e.apply(this, arguments);
          };
        })(),
        m = function(e, t) {
          return s.c
            .collection(e)
            .add(
              Object(o.a)({}, t, {
                createdAt: l.a.firestore.FieldValue.serverTimestamp(),
                updatedAt: l.a.firestore.FieldValue.serverTimestamp(),
              })
            );
        },
        p = (function() {
          var e = Object(i.a)(
            r.a.mark(function e(t, a) {
              var n;
              return r.a.wrap(function(e) {
                for (;;)
                  switch ((e.prev = e.next)) {
                    case 0:
                      return (
                        (e.next = 2),
                        s.c
                          .collection(t)
                          .doc(a)
                          .get()
                      );
                    case 2:
                      return (
                        (n = e.sent),
                        e.abrupt('return', Object(o.a)({ id: n.id }, n.data()))
                      );
                    case 4:
                    case 'end':
                      return e.stop();
                  }
              }, e);
            })
          );
          return function(t, a) {
            return e.apply(this, arguments);
          };
        })();
    },
    457: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(64),
        o = a(13),
        s = a(334),
        c = a(41);
      t.default = Object(i.a)(function(e) {
        var t = e.authUser,
          a = e.history;
        return (
          Object(n.useEffect)(function() {
            t && a.push(o.f);
          }, []),
          r.a.createElement(s.default, { isPublic: !0, view: c.a.signIn })
        );
      });
    },
    458: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(53),
        c = a(106),
        l = a(0),
        u = a.n(l),
        d = a(16),
        m = a.n(d),
        p = a(347),
        g = a.n(p),
        h = a(681),
        f = a.n(h),
        b = a(122),
        E = a.n(b),
        y = a(351),
        v = a.n(y),
        x = a(49),
        j = a.n(x),
        S = a(682),
        N = a.n(S),
        k = a(117),
        O = a(735),
        w = a(1673),
        C = a(680),
        T = a.n(C),
        _ = a(7),
        L = a.n(_),
        I = { success: g.a, warning: T.a, error: f.a, info: E.a },
        A = L()(function(e) {
          return {
            success: { backgroundColor: j.a[600] },
            error: { backgroundColor: e.palette.error.dark },
            info: { backgroundColor: e.palette.primary.dark },
            warning: { backgroundColor: N.a[700] },
            icon: { fontSize: 20 },
            iconVariant: { opacity: 0.9, marginRight: e.spacing(1) },
            message: { display: 'flex', alignItems: 'center' },
          };
        })(function(e) {
          var t = e.classes,
            a = e.className,
            n = e.message,
            r = e.onClose,
            i = e.variant,
            o = Object(c.a)(e, [
              'classes',
              'className',
              'message',
              'onClose',
              'variant',
            ]),
            s = I[i];
          return u.a.createElement(
            w.a,
            Object.assign(
              {
                className: m()(t[i], a),
                'aria-describedby': 'client-snackbar',
                message: u.a.createElement(
                  'span',
                  { id: 'client-snackbar', className: t.message },
                  u.a.createElement(s, {
                    className: m()(t.icon, t.iconVariant),
                  }),
                  n
                ),
                action: [
                  u.a.createElement(
                    k.a,
                    {
                      key: 'close',
                      'aria-label': 'Close',
                      color: 'inherit',
                      className: t.close,
                      onClick: r,
                    },
                    u.a.createElement(v.a, { className: t.icon })
                  ),
                ],
              },
              o
            )
          );
        }),
        R = (function(e) {
          function t() {
            var e, a;
            Object(n.a)(this, t);
            for (var r = arguments.length, s = new Array(r), c = 0; c < r; c++)
              s[c] = arguments[c];
            return (
              ((a = Object(i.a)(
                this,
                (e = Object(o.a)(t)).call.apply(e, [this].concat(s))
              )).state = { open: !1 }),
              (a.handleOpen = function() {
                a.setState({ open: !0 });
              }),
              (a.handleClose = function(e, t) {
                'clickaway' !== t && a.setState({ open: !1 });
              }),
              a
            );
          }
          return (
            Object(s.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'componentDidUpdate',
                value: function(e, t) {
                  e.data !== this.props.data && this.handleOpen();
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props.data;
                  return e
                    ? u.a.createElement(
                        'div',
                        null,
                        u.a.createElement(
                          O.a,
                          {
                            anchorOrigin: {
                              vertical: 'top',
                              horizontal: 'center',
                            },
                            open: this.state.open,
                            autoHideDuration: 1e4,
                            onClose: this.handleClose,
                          },
                          u.a.createElement(A, {
                            onClose: this.handleClose,
                            variant: e.variant,
                            message: e.message,
                          })
                        )
                      )
                    : null;
                },
              },
            ]),
            t
          );
        })(u.a.Component);
      t.default = L()(function(e) {
        return { margin: { margin: e.spacing(1) } };
      })(R);
    },
    459: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(11),
        c = a(9),
        l = a(352),
        u = a.n(l),
        d = a(276),
        m = a.n(d);
      t.default = o()(function(e) {
        return {
          copy: {
            maxWidth: 400,
            marginRight: 60,
            '& *': { color: '#fff', textAlign: 'left' },
          },
          subtitle: { marginTop: 10, lineHeight: 1.3, fontWeight: 400 },
          womanGraphic: {
            width: 148,
            height: 148,
            marginRight: 20,
            marginLeft: -8,
          },
          tickGrid: { height: 148, '& > *': { width: '100%' } },
          tick: { height: 32, verticalAlign: 'bottom', marginRight: 5 },
          tickText: { display: 'inline', fontWeight: 400 },
        };
      })(function(e) {
        var t = e.classes;
        return r.a.createElement(
          s.a,
          { item: !0, className: t.copy },
          r.a.createElement(
            c.a,
            { variant: 'h4' },
            'We bridge the gap between startups and students'
          ),
          r.a.createElement(
            c.a,
            { className: t.subtitle, variant: 'h6' },
            'The simplest way to get access to meaningful work experience'
          ),
          r.a.createElement(
            s.a,
            { container: !0, style: { marginTop: 40 } },
            r.a.createElement(
              s.a,
              { item: !0 },
              r.a.createElement('img', {
                src: u.a,
                className: t.womanGraphic,
                alt: '2hats',
              })
            ),
            r.a.createElement(
              s.a,
              { item: !0, xs: !0 },
              r.a.createElement(
                s.a,
                {
                  container: !0,
                  justify: 'space-between',
                  className: t.tickGrid,
                },
                r.a.createElement(
                  s.a,
                  { item: !0 },
                  r.a.createElement('img', {
                    src: m.a,
                    className: t.tick,
                    alt: 'Tick',
                  }),
                  r.a.createElement(
                    c.a,
                    { className: t.tickText, variant: 'h6' },
                    'Paid jobs'
                  )
                ),
                r.a.createElement(
                  s.a,
                  { item: !0 },
                  r.a.createElement('img', {
                    src: m.a,
                    className: t.tick,
                    alt: 'Tick',
                  }),
                  r.a.createElement(
                    c.a,
                    { className: t.tickText, variant: 'h6' },
                    'Real life skill tests'
                  )
                ),
                r.a.createElement(
                  s.a,
                  { item: !0 },
                  r.a.createElement('img', {
                    src: m.a,
                    className: t.tick,
                    alt: 'Tick',
                  }),
                  r.a.createElement(
                    c.a,
                    { className: t.tickText, variant: 'h6' },
                    'Bite-sized courses'
                  )
                ),
                r.a.createElement(
                  s.a,
                  { item: !0 },
                  r.a.createElement('img', {
                    src: m.a,
                    className: t.tick,
                    alt: 'Tick',
                  }),
                  r.a.createElement(
                    c.a,
                    { className: t.tickText, variant: 'h6' },
                    'Free for Uni students'
                  )
                )
              )
            )
          )
        );
      });
    },
    460: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(9),
        o = a(13),
        s = a(83),
        c = a(181),
        l = a(496),
        u = a(7),
        d = a.n(u),
        m = a(352),
        p = a.n(m),
        g = a(11);
      t.default = d()(function(e) {
        return {
          root: { height: '100vh' },
          womanGraphic: { width: 100, height: 100, marginLeft: -5 },
          link: {
            marginLeft: e.spacing(0.5),
            color: e.palette.primary.main,
            textDecoration: 'none',
            '&:hover': { textDecoration: 'underline' },
          },
        };
      })(function(e) {
        var t = e.onSignupRoute,
          a = e.isLoading,
          n = e.GTeventHandler,
          u = e.changeHandler,
          d = e.isLessThan840,
          m = e.classes,
          h = e.urlParams,
          f = r.a.createElement(s.default, {
            greeting: t ? 'Sign Up' : 'Sign In',
          });
        return (
          d &&
            t &&
            (f = r.a.createElement(
              g.a,
              {
                container: !0,
                direction: 'row',
                alignItems: 'center',
                justify: 'space-between',
                style: { height: 150 },
              },
              r.a.createElement(
                g.a,
                { item: !0, xs: 3 },
                r.a.createElement('img', {
                  src: p.a,
                  className: m.womanGraphic,
                  alt: '2hats',
                })
              ),
              r.a.createElement(
                g.a,
                { item: !0, xs: 7 },
                r.a.createElement(
                  i.a,
                  { variant: 'h4', style: { fontSize: 19, marginRight: -10 } },
                  'The simplest way to get access to meaningful work experience'
                )
              )
            )),
          r.a.createElement(
            r.a.Fragment,
            null,
            f,
            r.a.createElement(c.default, {
              disabled: a,
              key: 'google-button',
              id: 'google-button',
              GTevent: n,
              action: t ? 'Sign up' : 'Sign in',
              changeHandler: u,
            }),
            r.a.createElement(
              i.a,
              { variant: 'subtitle1', style: { marginTop: 15 } },
              'OR'
            ),
            r.a.createElement(l.default, { changeHandler: u, urlParams: h }),
            r.a.createElement(
              'div',
              null,
              r.a.createElement(
                i.a,
                {
                  variant: 'body2',
                  style: { display: 'inline', marginRight: 5 },
                },
                t ? 'Already have an account?' : 'Don\u2019t have an account?',
                r.a.createElement(
                  'a',
                  {
                    id: 'signin-signup-toggle',
                    className: m.link,
                    href: t ? o.o : o.p,
                  },
                  t ? 'Sign in' : 'Sign up'
                )
              )
            )
          )
        );
      });
    },
    461: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(282),
        o = a(258);
      t.default = Object(o.withOnEnter)(function(e) {
        var t = e.changeHandler,
          a = e.value,
          n = e.handleKeyPress;
        return r.a.createElement(i.a, {
          id: 'email',
          key: 'email',
          label: 'Email Address',
          onChange: t('email'),
          value: a,
          onKeyPress: n,
          style: { marginTop: 0, width: '100%', marginBottom: 5 },
          margin: 'normal',
          color: 'primary',
          type: 'email',
        });
      });
    },
    462: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(50),
        r = a(51),
        i = a(54),
        o = a(52),
        s = a(30),
        c = a(53),
        l = a(0),
        u = a.n(l),
        d = a(9),
        m = a(36),
        p = a(192),
        g = a(21),
        h = a(67),
        f = a.n(h),
        b = a(136),
        E = a(83),
        y = (function(e) {
          function t() {
            var e;
            return (
              Object(n.a)(this, t),
              ((e = Object(i.a)(
                this,
                Object(o.a)(t).call(this)
              )).resendEmail = e.resendEmail.bind(Object(s.a)(e))),
              e
            );
          }
          return (
            Object(c.a)(t, e),
            Object(r.a)(t, [
              {
                key: 'resendEmail',
                value: function() {
                  var e = this.props,
                    t = e.email,
                    a = e.changeHandler,
                    n = { email: t.toLowerCase() };
                  Object(g.b)(
                    g.a.CREATE_PASSWORD,
                    n,
                    a('snackBar', {
                      variant: 'success',
                      message: 'You should receive the email shortly',
                    }),
                    function(e) {
                      a('snackBar', {
                        variant: 'error',
                        message:
                          'An error has occured. Please try again in a moment',
                      }),
                        console.log(e);
                    }
                  );
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.props,
                    t = e.isLoading,
                    a = e.email,
                    n = e.backHandler,
                    r = e.firstName;
                  return u.a.createElement(
                    u.a.Fragment,
                    null,
                    u.a.createElement(b.default, {
                      isLoading: t,
                      email: a,
                      backHandler: n,
                    }),
                    u.a.createElement(E.default, {
                      greeting: 'Welcome back',
                      name: r,
                    }),
                    u.a.createElement(
                      'div',
                      null,
                      u.a.createElement(
                        d.a,
                        { variant: 'body2', gutterBottom: !0 },
                        'We\u2019ve sent you a confirmation email. Please check your inbox.'
                      ),
                      u.a.createElement(
                        d.a,
                        { variant: 'body2' },
                        'Don\u2019t forget to check your spam or junk folder.'
                      )
                    ),
                    u.a.createElement(p.a, {
                      style: { width: '100%', margin: '16px 0' },
                    }),
                    u.a.createElement(
                      d.a,
                      {
                        variant: 'body2',
                        gutterBottom: !0,
                        color: 'textSecondary',
                      },
                      'Didn\u2019t receive the email?'
                    ),
                    u.a.createElement(
                      m.a,
                      {
                        variant: 'outlined',
                        color: 'primary',
                        onClick: this.resendEmail,
                      },
                      'Resend Email',
                      u.a.createElement(f.a, null)
                    )
                  );
                },
              },
            ]),
            t
          );
        })(u.a.Component);
      t.default = y;
    },
    463: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(14),
        r = a(12),
        i = a(0),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(36),
        u = a(689),
        d = a.n(u),
        m = a(268),
        p = a(353),
        g = a(64),
        h = a(383);
      t.default = Object(g.a)(
        c()(function(e) {
          return {
            root: { paddingLeft: 50, paddingRight: 50, height: 500 },
            socialButton: {
              margin: 5,
              width: 250,
              height: 40,
              color: '#fff',
              backgroundColor: '#fff',
              padding: 0,
            },
            socialIcon: { marginRight: 16 },
            linkedin: { backgroundColor: '#fffffe', borderColor: '#fffffe' },
          };
        })(function(e) {
          var t = Object(i.useState)('linkedinState214235'),
            a = Object(r.a)(t, 1)[0],
            s = e.classes,
            c = e.action;
          return o.a.createElement(
            h.a,
            {
              className: s.linkedin,
              clientId: m.c,
              onFailure: function(e) {
                console.log(e);
              },
              onSuccess: function(e) {
                Object(p.b)(Object(n.a)({}, e, { state: a }), function(e) {
                  console.log(e);
                });
              },
              redirectUri: 'http://localhost:3333/linkedin',
              state: 'linkedinState214235',
            },
            o.a.createElement(
              l.a,
              {
                key: 'linkedin-button',
                id: 'linkedin-button',
                variant: 'contained',
                style: { backgroundColor: '#0077B5' },
                className: s.socialButton,
              },
              o.a.createElement('img', {
                alt: 'linkedinLogo',
                src: d.a,
                className: s.socialIcon,
              }),
              c || 'sign in',
              ' with LinkedIn'
            )
          );
        })
      );
    },
    464: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(9),
        o = a(36),
        s = a(123),
        c = a(465),
        l = a(137),
        u = a(136),
        d = a(83),
        m = a(259);
      t.default = function(e) {
        var t = e.isLoading,
          a = e.email,
          n = e.backHandler,
          p = e.onSignupRoute,
          g = e.changeHandler,
          h = e.firstName,
          f = e.lastName,
          b = e.password,
          E = e.passwordAction;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(u.default, {
            isLoading: t,
            email: a,
            backHandler: n,
          }),
          r.a.createElement(d.default, { greeting: 'Sign Up' }),
          p
            ? null
            : r.a.createElement(
                i.a,
                { variant: 'body2' },
                'It looks like we don\u2019t have an account with this email address.'
              ),
          r.a.createElement(
            'div',
            { style: { marginTop: 10 } },
            r.a.createElement(
              s.default,
              { changeHandler: g },
              r.a.createElement(c.default, { firstName: h, lastName: f })
            ),
            r.a.createElement(
              s.default,
              { changeHandler: g },
              r.a.createElement(l.default, { primaryAction: E, password: b })
            )
          ),
          r.a.createElement(m.default, null),
          r.a.createElement(
            o.a,
            {
              id: 'sign-up-button',
              variant: 'contained',
              color: 'primary',
              disabled: t,
              onClick: E,
              style: { width: 120 },
            },
            'Sign up'
          )
        );
      };
    },
    465: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(11),
        o = a(282);
      t.default = function(e) {
        var t = e.changeHandler,
          a = e.firstName,
          n = e.lastName;
        return r.a.createElement(
          i.a,
          {
            key: 'nameFields',
            container: !0,
            justify: 'space-between',
            direction: 'row',
            style: { width: '100%', marginTop: -20 },
          },
          r.a.createElement(o.a, {
            id: 'firstName',
            label: 'First Name',
            value: a,
            onChange: t('firstName'),
            style: { width: '46%' },
            margin: 'normal',
            color: 'primary',
          }),
          r.a.createElement(o.a, {
            id: 'lastName',
            label: 'Last Name',
            value: n,
            onChange: t('lastName'),
            style: { width: '46%' },
            margin: 'normal',
            color: 'primary',
          })
        );
      };
    },
    466: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(36),
        o = a(11),
        s = a(123),
        c = a(137),
        l = a(467),
        u = a(136),
        d = a(83);
      t.default = function(e) {
        var t = e.isLoading,
          a = e.email,
          n = e.backHandler,
          m = e.changeHandler,
          p = e.firstName,
          g = e.password,
          h = e.passwordAction,
          f = e.forgotPasswordHandler;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(u.default, {
            isLoading: t,
            email: a,
            backHandler: n,
          }),
          r.a.createElement(d.default, { greeting: 'Welcome back', name: p }),
          r.a.createElement(
            s.default,
            { changeHandler: m },
            r.a.createElement(c.default, { primaryAction: h, password: g })
          ),
          r.a.createElement(
            o.a,
            {
              container: !0,
              alignItems: 'center',
              justify: 'space-between',
              style: { marginTop: 40 },
            },
            r.a.createElement(
              i.a,
              {
                disabled: t,
                onClick: h,
                id: 'password-sign-in',
                style: { width: 120 },
                variant: 'contained',
                color: 'primary',
              },
              'Sign in'
            ),
            r.a.createElement(l.default, { onClick: f }, 'Forgot password?')
          )
        );
      };
    },
    467: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(106),
        i = a(0),
        o = a.n(i),
        s = a(16),
        c = a.n(s),
        l = a(7),
        u = a.n(l),
        d = a(281);
      t.default = u()(function(e) {
        return {
          root: {
            fontSize: '13px',
            color: e.palette.primary.main,
            textDecoration: 'inherit',
            '&:hover': { textDecoration: 'underline', cursor: 'pointer' },
          },
          primary: { color: e.palette.primary.main },
        };
      })(function(e) {
        var t = e.children,
          a = e.classes,
          i = e.className,
          s = e.variant,
          l = Object(r.a)(e, ['children', 'classes', 'className', 'variant']);
        return o.a.createElement(
          d.a,
          Object.assign(
            {
              component: 'button',
              className: c()(
                a.root,
                Object(n.a)({}, a.primary, 'primary' === s),
                i
              ),
            },
            l
          ),
          t
        );
      });
    },
    468: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(36),
        o = a(9),
        s = a(13),
        c = a(123),
        l = a(137),
        u = a(83);
      t.default = function(e) {
        var t = e.firstName,
          a = e.changeHandler,
          n = e.password,
          d = e.passwordAction,
          m = e.isLoading;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(u.default, { greeting: 'Hello', name: t }),
          r.a.createElement(
            o.a,
            { variant: 'subtitle1' },
            'Please type a new password below.'
          ),
          r.a.createElement(
            'div',
            { style: { marginTop: 10, width: '100%' } },
            r.a.createElement(
              c.default,
              { changeHandler: a },
              r.a.createElement(l.default, {
                primaryAction: d,
                password: n,
                label: 'New Password',
              })
            )
          ),
          r.a.createElement(
            i.a,
            {
              variant: 'contained',
              color: 'primary',
              disabled: m,
              style: { width: 180, marginTop: 40 },
              onClick: function() {
                d(s.f);
              },
            },
            'Update password'
          )
        );
      };
    },
    469: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(9),
        o = a(36),
        s = a(13),
        c = a(123),
        l = a(137),
        u = a(83),
        d = a(181);
      t.default = function(e) {
        var t = e.firstName,
          a = e.isLoading,
          n = e.onSignupRoute,
          m = e.GTeventHandler,
          p = e.changeHandler,
          g = e.password,
          h = e.passwordAction;
        return r.a.createElement(
          r.a.Fragment,
          null,
          r.a.createElement(u.default, { greeting: 'Welcome back', name: t }),
          r.a.createElement(
            i.a,
            { variant: 'subtitle1', style: { marginBottom: 10 } },
            'It looks like you don\u2019t have a password yet.'
          ),
          r.a.createElement(d.default, {
            disabled: a,
            key: 'google-button',
            id: 'google-button',
            GTevent: m,
            action: n ? 'Sign up' : 'Sign in',
            changeHandler: p,
          }),
          r.a.createElement(
            i.a,
            {
              variant: 'subtitle1',
              style: { marginTop: 15, marginBottom: 20 },
            },
            'OR'
          ),
          r.a.createElement(
            c.default,
            { changeHandler: p },
            r.a.createElement(l.default, { primaryAction: h, password: g })
          ),
          r.a.createElement(
            o.a,
            {
              variant: 'contained',
              color: 'primary',
              disabled: a,
              style: { width: 180, marginTop: 40 },
              onClick: function() {
                h(s.f);
              },
            },
            'Create password'
          )
        );
      };
    },
    470: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(64),
        o = a(21);
      t.default = Object(i.a)(function(e) {
        return (
          Object(n.useEffect)(
            function() {
              var t = e.history.location.hash;
              t &&
                Object(o.b)(
                  o.a.TAG_TRACKER,
                  { type: 'link', name: t.replace('#', '') },
                  function(e) {
                    console.log(e);
                  },
                  function(e) {
                    console.log(e);
                  }
                );
            },
            [e.history.location]
          ),
          r.a.createElement('div', null)
        );
      });
    },
    471: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(64),
        o = a(7),
        s = a.n(o),
        c = a(11),
        l = a(9),
        u = a(36),
        d = a(360),
        m = a.n(d),
        p = a(13),
        g = a(216),
        h = a.n(g);
      t.default = Object(i.a)(
        s()(function(e) {
          return {
            root: {
              minHeight: '100vh',
              minWidth: '100vw',
              textAlign: 'center',
              padding: e.spacing(2),
              backgroundColor: e.palette.background.paper,
            },
            button: { margin: e.spacing(4) },
            logo: {
              userSelect: 'none',
              userDrag: 'none',
              width: 80,
              opacity: 0.5,
              marginBottom: e.spacing(1),
            },
          };
        })(function(e) {
          var t = e.classes,
            a = e.history;
          return r.a.createElement(
            c.a,
            {
              container: !0,
              className: t.root,
              justify: 'center',
              alignItems: 'center',
            },
            r.a.createElement(
              c.a,
              { item: !0 },
              r.a.createElement('img', {
                src: h.a,
                alt: '2hats',
                className: t.logo,
              }),
              r.a.createElement(
                l.a,
                { variant: 'h5' },
                'This page was not found'
              ),
              r.a.createElement(
                u.a,
                {
                  color: 'primary',
                  className: t.button,
                  onClick: function() {
                    a.push(p.f);
                  },
                },
                'Go to Dashboard',
                r.a.createElement(m.a, null)
              )
            )
          );
        })
      );
    },
    474: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(9),
        c = a(261);
      t.default = o()(function(e) {
        return {
          root: { minHeight: 100, userSelect: 'none' },
          placeholderAvatar: {
            width: 64,
            height: 64,
            background: e.palette.divider,
            borderRadius: '50%',
            animation: 'fade-in-out 1.5s infinite',
          },
          '@keyframes fade-in-out': {
            '0%': { opacity: 1 },
            '50%': { opacity: 0 },
            '100%': { opacity: 1 },
          },
          displayName: {
            paddingLeft: e.spacing(0.5),
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.user;
        return a
          ? r.a.createElement(
              'div',
              { className: t.root },
              r.a.createElement(c.default, {
                uid: a && a.id,
                firstName: a ? a.firstName : '',
                lastName: a ? a.lastName : '',
                avatarURL: a ? a.avatarURL : '',
              }),
              r.a.createElement(
                s.a,
                {
                  variant: 'h6',
                  style: { paddingLeft: 4 },
                  className: t.displayName,
                },
                a && a.firstName
              )
            )
          : r.a.createElement(
              'div',
              { className: t.root },
              r.a.createElement('div', { className: t.placeholderAvatar })
            );
      });
    },
    475: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(165),
        o = a(512),
        s = a(218),
        c = a.n(s),
        l = a(89);
      t.default = function(e) {
        var t,
          a = e.className,
          n = e.data,
          s = e.tooltip,
          u = e.noInitialsIcon;
        n.displayName
          ? (t = n.displayName)
          : n.givenName
          ? (t = ''.concat(n.givenName, ' ').concat(n.familyName))
          : n.firstName && (t = ''.concat(n.firstName, ' ').concat(n.lastName));
        var d = n.avatarURL
          ? r.a.createElement(i.a, { className: a, src: n.avatarURL })
          : r.a.createElement(
              i.a,
              { className: a },
              t ? Object(l.c)(t) : u || r.a.createElement(c.a, null)
            );
        return s ? r.a.createElement(o.a, { title: t }, d) : d;
      };
    },
    476: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(17),
        i = a(0),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(11),
        u = a(9),
        d = a(49),
        m = a.n(d),
        p = a(477),
        g = a(478),
        h = a(479),
        f = a(480),
        b = a(481),
        E = a(278),
        y = a(88),
        v = a(5),
        x = a(21),
        j = a(31),
        S = a.n(j);
      t.default = c()(
        function(e) {
          return {
            root: Object(r.a)(
              {
                position: 'relative',
                boxSizing: 'border-box',
                margin: '0 auto',
                marginBottom: e.spacing(6),
                padding: e.spacing(4),
                borderRadius: e.shape.borderRadius,
                backgroundColor: e.palette.background.paper,
                userSelect: 'none',
                boxShadow: e.shadowsLight[24],
              },
              e.breakpoints.down('sm'),
              {
                width: 'calc(100% - '.concat(e.spacing(2), 'px) !important'),
                maxWidth: 660,
              }
            ),
            iconWrapper: {
              marginRight: e.spacing(2),
              marginLeft: -e.spacing(1) / 2,
            },
            whatsNextIcon: { fontSize: 32, color: e.palette.text.primary },
            title: {
              fontWeight: 500,
              marginTop: 2,
              color: e.palette.text.primary,
            },
            green: { color: m.a[500] },
            description: { fontWeight: 400 },
            divider: Object(r.a)(
              {
                margin: e.spacing(4),
                marginLeft: e.spacing(5.5),
                marginRight: e.spacing(1),
              },
              e.breakpoints.down('sm'),
              { marginLeft: 0, marginRight: 0 }
            ),
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.classes,
          a = e.theme,
          r = e.user,
          s = e.width,
          c = Object(E.a)(a.breakpoints.down('sm')),
          d = Object(y.a)({
            path: ''.concat(v.COLLECTIONS.profiles, '/').concat(r.id),
          }),
          m = Object(n.a)(d, 1)[0].doc;
        return (
          Object(i.useEffect)(
            function() {
              m &&
                (!m.whatsNext ||
                  S()().diff(
                    S.a.unix(m.whatsNext.updatedAt.seconds),
                    'minutes'
                  ) > 30) &&
                (console.log('called whatsNextAI'),
                Object(x.b)(
                  x.a.WHATS_NEXT_AI,
                  {},
                  function(e) {
                    return console.log(e);
                  },
                  function(e) {
                    return console.log(e);
                  }
                ));
            },
            [m]
          ),
          m && m.whatsNext && m.whatsNext.state
            ? o.a.createElement(
                'div',
                { className: t.root, style: { width: s - 16 } },
                o.a.createElement(p.default, {
                  badge: m.whatsNext.badge,
                  classes: t,
                  isMobile: c,
                }),
                o.a.createElement(
                  l.a,
                  {
                    container: !0,
                    alignItems:
                      m.whatsNext.state === v.WHATS_NEXT_STATES.uploadResume
                        ? 'flex-start'
                        : 'flex-end',
                    spacing: 3,
                  },
                  o.a.createElement(
                    l.a,
                    { item: !0, xs: !0 },
                    o.a.createElement(
                      l.a,
                      { container: !0, direction: c ? 'column' : 'row' },
                      o.a.createElement(
                        l.a,
                        { item: !0, className: t.iconWrapper },
                        o.a.createElement(g.default, {
                          className: t.whatsNextIcon,
                          state: m.whatsNext.state,
                        })
                      ),
                      o.a.createElement(
                        l.a,
                        { item: !0, xs: !0 },
                        o.a.createElement(
                          u.a,
                          {
                            variant: 'h6',
                            className: t.title,
                            gutterBottom: !0,
                          },
                          o.a.createElement(h.default, {
                            state: m.whatsNext.state,
                          })
                        ),
                        o.a.createElement(
                          u.a,
                          { variant: 'body1', className: t.description },
                          o.a.createElement(f.default, {
                            state: m.whatsNext.state,
                            data: m.whatsNext.data,
                          })
                        )
                      )
                    )
                  ),
                  o.a.createElement(
                    l.a,
                    {
                      item: !0,
                      xs: 12,
                      sm:
                        m.whatsNext.state === v.WHATS_NEXT_STATES.uploadResume
                          ? 4
                          : 'auto',
                    },
                    o.a.createElement(b.default, {
                      state: m.whatsNext.state,
                      data: m.whatsNext.data,
                    })
                  )
                )
              )
            : null
        );
      });
    },
    477: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(64),
        c = a(11),
        l = a(9),
        u = a(36),
        d = a(192),
        m = a(100),
        p = a(80),
        g = a.n(p),
        h = (a(5), a(13));
      t.default = Object(s.a)(function(e) {
        var t = e.classes,
          a = e.badge,
          n = e.isMobile,
          i = e.history;
        return a
          ? r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(
                c.a,
                { container: !0, alignItems: 'flex-end', spacing: 3 },
                r.a.createElement(
                  c.a,
                  { item: !0, xs: !0 },
                  r.a.createElement(
                    c.a,
                    { container: !0, direction: n ? 'column' : 'row' },
                    r.a.createElement(
                      c.a,
                      { item: !0, className: t.iconWrapper },
                      r.a.createElement(m.a, {
                        className: o()(t.whatsNextIcon, t.green),
                      })
                    ),
                    r.a.createElement(
                      c.a,
                      { item: !0, xs: !0 },
                      r.a.createElement(
                        l.a,
                        {
                          variant: 'h6',
                          className: o()(t.title, t.green),
                          gutterBottom: !0,
                        },
                        'Congratulations!'
                      ),
                      r.a.createElement(
                        l.a,
                        { variant: 'body1', className: t.description },
                        'You passed the ',
                        r.a.createElement('b', null, a.title),
                        ' ',
                        a.type.replace('assessment', 'task'),
                        '.'
                      )
                    )
                  )
                ),
                'assessment' === a.type &&
                  r.a.createElement(
                    c.a,
                    { item: !0, xs: 12, sm: 'auto' },
                    r.a.createElement(
                      u.a,
                      {
                        color: 'primary',
                        variant: 'outlined',
                        onClick: function() {
                          i.push(
                            ''.concat(h.a, '?id=').concat(a.id, '&yours=true')
                          );
                        },
                      },
                      'View Feedback',
                      r.a.createElement(g.a, null)
                    )
                  )
              ),
              r.a.createElement(d.a, { className: t.divider })
            )
          : null;
      });
    },
    478: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(106),
        r = a(0),
        i = a.n(r),
        o = a(156),
        s = a.n(o),
        c = a(218),
        l = a.n(c),
        u = a(63),
        d = a.n(u),
        m = a(71),
        p = a.n(m),
        g = a(70),
        h = a.n(g),
        f = a(5);
      t.default = function(e) {
        var t = e.state,
          a = Object(n.a)(e, ['state']);
        switch (t) {
          case f.WHATS_NEXT_STATES.uploadResume:
            return i.a.createElement(s.a, a);
          case f.WHATS_NEXT_STATES.completeCourse:
          case f.WHATS_NEXT_STATES.startNewCourse:
            return i.a.createElement(h.a, a);
          case f.WHATS_NEXT_STATES.completeAssessment:
          case f.WHATS_NEXT_STATES.awaitAssessmentOutcome:
          case f.WHATS_NEXT_STATES.startNewAssessment:
            return i.a.createElement(p.a, a);
          case f.WHATS_NEXT_STATES.awaitJobApplicationOutcome:
          case f.WHATS_NEXT_STATES.startNewJobApplication:
            return i.a.createElement(d.a, a);
          case f.WHATS_NEXT_STATES.completeProfile:
            return i.a.createElement(l.a, a);
          default:
            return null;
        }
      };
    },
    479: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(1),
        r = a.n(n),
        i = a(5),
        o = function(e) {
          switch (e.state) {
            case i.WHATS_NEXT_STATES.booking:
              return 'You have an upcoming booking';
            case i.WHATS_NEXT_STATES.uploadResume:
              return 'Next step: upload your resume';
            case i.WHATS_NEXT_STATES.completeCourse:
              return 'You have an unfinished course';
            case i.WHATS_NEXT_STATES.startNewCourse:
              return 'Get started with one of our courses';
            case i.WHATS_NEXT_STATES.completeAssessment:
              return 'You have an incomplete task';
            case i.WHATS_NEXT_STATES.awaitAssessmentOutcome:
              return 'While you wait for your task outcome\u2026';
            case i.WHATS_NEXT_STATES.startNewAssessment:
              return 'Get started with one of our tasks';
            case i.WHATS_NEXT_STATES.completeProfile:
              return 'Complete your profile';
            case i.WHATS_NEXT_STATES.awaitJobApplicationOutcome:
              return 'We\u2019re reviewing your job application';
            case i.WHATS_NEXT_STATES.startNewJobApplication:
              return 'Apply for one of our jobs';
            default:
              return null;
          }
        };
      (o.propTypes = { state: r.a.string }), (t.default = o);
    },
    480: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(5);
      t.default = function(e) {
        var t = e.state,
          a = e.data;
        switch (t) {
          case i.WHATS_NEXT_STATES.booking:
            return 'You have an upcoming booking';
          case i.WHATS_NEXT_STATES.uploadResume:
            return 'It looks like you haven\u2019t uploaded your resume yet. Uploading a resume will make applying for jobs faster and make it easier for us to see what best suits you.';
          case i.WHATS_NEXT_STATES.completeCourse:
            return r.a.createElement(
              r.a.Fragment,
              null,
              'You haven\u2019t finished ',
              r.a.createElement('b', null, a.title.trim()),
              '.',
              r.a.createElement('br', null),
              'Complete the course to learn new skills to make you job ready.'
            );
          case i.WHATS_NEXT_STATES.startNewCourse:
            return 'Our courses teach you real skills used in the workplace to make you job ready.';
          case i.WHATS_NEXT_STATES.completeAssessment:
            return r.a.createElement(
              r.a.Fragment,
              null,
              'You haven\u2019t completed your submission for ',
              r.a.createElement('b', null, a.title.trim()),
              '. Passing tasks allow us to verify your skills and get you job-ready.'
            );
          case i.WHATS_NEXT_STATES.awaitAssessmentOutcome:
            return r.a.createElement(
              r.a.Fragment,
              null,
              'You can attempt another task and get more of your',
              ' ',
              r.a.createElement('b', null, a.category.trim()),
              ' skills recognised.'
            );
          case i.WHATS_NEXT_STATES.startNewAssessment:
            return 'Get your skills recognised and be ready to apply for jobs.';
          case i.WHATS_NEXT_STATES.completeProfile:
            return 'Complete your profile to get ready to apply for jobs.';
          case i.WHATS_NEXT_STATES.awaitJobApplicationOutcome:
            return 'Sit tight!';
          case i.WHATS_NEXT_STATES.startNewJobApplication:
            return 'Kickstart your career with 2hats.';
          default:
            return null;
        }
      };
    },
    481: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(64),
        o = a(36),
        s = a(80),
        c = a.n(s),
        l = a(262),
        u = a(5),
        d = a(13);
      t.default = Object(i.a)(function(e) {
        var t = e.state,
          a = e.data,
          n = e.history;
        switch (t) {
          case u.WHATS_NEXT_STATES.booking:
            return 'Booking CTA';
          case u.WHATS_NEXT_STATES.uploadResume:
            return r.a.createElement(l.default, null);
          case u.WHATS_NEXT_STATES.completeCourse:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(''.concat(d.d, '?id=').concat(a.id));
                },
              },
              'Complete Course',
              r.a.createElement(c.a, null)
            );
          case u.WHATS_NEXT_STATES.startNewCourse:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(d.c);
                },
              },
              'Browse Courses',
              r.a.createElement(c.a, null)
            );
          case u.WHATS_NEXT_STATES.completeAssessment:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(''.concat(d.a, '?id=').concat(a.id, '&yours=true'));
                },
              },
              'Complete Task',
              r.a.createElement(c.a, null)
            );
          case u.WHATS_NEXT_STATES.awaitAssessmentOutcome:
          case u.WHATS_NEXT_STATES.startNewAssessment:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(d.b);
                },
              },
              'Browse Tasks',
              r.a.createElement(c.a, null)
            );
          case u.WHATS_NEXT_STATES.completeProfile:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(d.l);
                },
              },
              'Complete Profile',
              r.a.createElement(c.a, null)
            );
          case u.WHATS_NEXT_STATES.awaitJobApplicationOutcome:
            return null;
          case u.WHATS_NEXT_STATES.startNewJobApplication:
            return r.a.createElement(
              o.a,
              {
                color: 'primary',
                variant: 'contained',
                size: 'large',
                onClick: function() {
                  n.push(d.i);
                },
              },
              'Browse Jobs',
              r.a.createElement(c.a, null)
            );
          default:
            return null;
        }
      });
    },
    482: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(64),
        c = a(7),
        l = a.n(c),
        u = a(9),
        d = a(49),
        m = a.n(d);
      t.default = Object(s.a)(
        l()(function(e) {
          return {
            root: {
              display: 'inline-flex',
              width: 'auto',
              position: 'relative',
              borderRadius: e.shape.borderRadius / 2,
              padding: ''
                .concat(e.spacing(0.5), 'px ')
                .concat(e.spacing(1.5), 'px'),
              backgroundColor: e.palette.divider,
              margin: e.spacing(0.5),
            },
            colorPrimary: {
              backgroundColor: e.palette.primary.light,
              '& *': { color: e.palette.primary.main },
            },
            colorGreen: {
              backgroundColor: m.a[100],
              '& *': { color: m.a[800] },
            },
            label: { lineHeight: '1.25', fontWeight: 500 },
          };
        })(function(e) {
          var t = e.classes,
            a = e.className,
            n = e.label,
            i = e.color;
          return r.a.createElement(
            'div',
            {
              className: o()(
                t.root,
                'primary' === i && t.colorPrimary,
                'green' === i && t.colorGreen,
                a
              ),
            },
            r.a.createElement(u.a, { variant: 'body1', className: t.label }, n)
          );
        })
      );
    },
    483: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(14),
        r = a(0),
        i = a.n(r),
        o = a(7),
        s = a.n(o),
        c = a(11),
        l = a(9),
        u = a(220),
        d = a.n(u),
        m = a(179),
        p = a(265),
        g = a(5);
      t.default = s()(function(e) {
        return Object(
          n.a
        )({}, g.STYLES.RENDERED_HTML(e), { description: { whiteSpace: 'pre-wrap', marginTop: e.spacing(1.5) }, timeWrapper: { marginTop: -e.spacing(1) }, timeIcon: { marginRight: e.spacing(0.5), color: e.palette.text.secondary } });
      })(function(e) {
        var t = e.classes,
          a = e.data;
        return i.a.createElement(
          i.a.Fragment,
          null,
          i.a.createElement(m.default, { value: a.category }),
          i.a.createElement(
            c.a,
            { container: !0, alignItems: 'flex-end', className: t.timeWrapper },
            i.a.createElement(d.a, { className: t.timeIcon }),
            i.a.createElement(
              l.a,
              { variant: 'body1', color: 'textSecondary' },
              a.duration
            )
          ),
          i.a.createElement(
            l.a,
            { component: 'p', className: t.description },
            a.description
          ),
          a.skillsAssociated &&
            0 !== a.skillsAssociated.length &&
            i.a.createElement(p.default, {
              values: a.skillsAssociated,
              header: 'Skills covered',
            })
        );
      });
    },
    484: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(186),
        u = a.n(l),
        d = a(63),
        m = a.n(d),
        p = a(71),
        g = a.n(p),
        h = a(70),
        f = a.n(h),
        b = a(716),
        E = a.n(b),
        y = a(389),
        v = a.n(y),
        x = a(270),
        j = a.n(x),
        S = a(108),
        N = a.n(S),
        k = a(143),
        O = a.n(k),
        w = a(506),
        C = a.n(w),
        T = a(107),
        _ = a.n(T);
      t.default = c()(function(e) {
        return {
          badgeIcon: {
            fontSize: e.spacing(2.25),
            backgroundColor: 'inherit',
            borderRadius: '50%',
            position: 'absolute',
            bottom: e.spacing(0.5),
            right: e.spacing(0.5),
          },
          badgeIconExtraPadding: {
            fontSize: e.spacing(2),
            boxShadow: '0 0 0 '
              .concat(e.spacing(0.5) - 1, 'px ')
              .concat(e.palette.primary.light),
          },
        };
      })(function(e) {
        var t = e.classes;
        switch (e.type) {
          case 'course-started':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(f.a, null),
              r.a.createElement(j.a, { className: t.badgeIcon })
            );
          case 'learn-world-certificate':
          case 'course-completed':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(f.a, null),
              r.a.createElement(O.a, { className: t.badgeIcon })
            );
          case 'assessment-started':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(g.a, null),
              r.a.createElement(j.a, { className: t.badgeIcon })
            );
          case 'assessment-submitted':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(g.a, null),
              r.a.createElement(N.a, {
                className: o()(t.badgeIcon, t.badgeIconExtraPadding),
              })
            );
          case 'assessment-pass':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(g.a, null),
              r.a.createElement(O.a, { className: t.badgeIcon })
            );
          case 'assessment-fail':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(g.a, null),
              r.a.createElement(C.a, { className: t.badgeIcon })
            );
          case 'job-applied':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(m.a, null),
              r.a.createElement(N.a, {
                className: o()(t.badgeIcon, t.badgeIconExtraPadding),
              })
            );
          case 'job-pass':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(m.a, null),
              r.a.createElement(O.a, { className: t.badgeIcon })
            );
          case 'job-fail':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(m.a, null),
              r.a.createElement(C.a, { className: t.badgeIcon })
            );
          case 'event-booked':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(E.a, null),
              r.a.createElement(N.a, {
                className: o()(t.badgeIcon, t.badgeIconExtraPadding),
              })
            );
          case 'ac-booked':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(v.a, null),
              r.a.createElement(N.a, {
                className: o()(t.badgeIcon, t.badgeIconExtraPadding),
              })
            );
          case 'ac-completed':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(v.a, null),
              r.a.createElement(O.a, { className: t.badgeIcon })
            );
          case 'book-ac':
            return r.a.createElement(
              r.a.Fragment,
              null,
              r.a.createElement(v.a, null),
              r.a.createElement(_.a, { className: t.badgeIcon })
            );
          case 'system':
          default:
            return r.a.createElement(u.a, null);
        }
      });
    },
    485: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(11),
        u = a(9),
        d = a(219),
        m = a.n(d),
        p = a(220),
        g = a.n(p),
        h = a(5);
      t.default = c()(function(e) {
        return {
          root: { textAlign: 'center' },
          metaWrapper: {
            display: 'inline-flex',
            width: 'auto',
            '& + &': { marginLeft: e.spacing(2) },
          },
          icon: { marginRight: e.spacing(1), opacity: 0.67 },
        };
      })(function(e) {
        var t = e.classes,
          a = e.className,
          n = e.data;
        return r.a.createElement(
          'div',
          { className: o()(t.root, a) },
          r.a.createElement(
            l.a,
            { container: !0, alignItems: 'flex-end', className: t.metaWrapper },
            r.a.createElement(m.a, { className: t.icon }),
            r.a.createElement(
              u.a,
              { variant: 'body1' },
              Object(h.getAssessmentCategoryLabel)(n.category)
            )
          ),
          r.a.createElement(
            l.a,
            { container: !0, alignItems: 'flex-end', className: t.metaWrapper },
            r.a.createElement(g.a, { className: t.icon }),
            r.a.createElement(u.a, { variant: 'body1' }, n.duration)
          )
        );
      });
    },
    486: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(729),
        r = a(12),
        i = a(17),
        o = a(14),
        s = a(0),
        c = a.n(s),
        l = a(64),
        u = a(7),
        d = a.n(u),
        m = a(11),
        p = a(9),
        g = a(36),
        h = a(280),
        f = a(735),
        b = a(79),
        E = a(71),
        y = a.n(E),
        v = a(143),
        x = a.n(v),
        j = a(108),
        S = a.n(j),
        N = a(376),
        k = a(5),
        O = a(89),
        w = a(45),
        C = a(222);
      t.default = Object(l.a)(
        d()(function(e) {
          var t;
          return Object(
            o.a
          )({ root: {}, section: { marginTop: e.spacing(3) } }, k.STYLES.RENDERED_HTML(e), { loading: { marginTop: e.spacing(3), backgroundColor: 'transparent' }, submitButton: { fontSize: e.spacing(2), borderRadius: 60, margin: ''.concat(e.spacing(3), 'px 0 ').concat(e.spacing(6), 'px'), '@media print': { display: 'none' } }, saveButton: { fontSize: e.spacing(2), borderRadius: 60, marginLeft: e.spacing(1), '@media print': { display: 'none' } }, paddedIcon: Object(i.a)({ marginLeft: -e.spacing(1) / 2, marginRight: e.spacing(1.5) }, e.breakpoints.up('lg'), { marginLeft: -60 }), snackbar: ((t = {}), Object(i.a)(t, e.breakpoints.down('sm'), { bottom: e.spacing(8) }), Object(i.a)(t, e.breakpoints.down('xs'), { bottom: e.spacing(7) }), t), savedTick: { verticalAlign: 'bottom', marginRight: e.spacing(1) } });
        })(function(e) {
          var t = e.classes,
            a = e.data,
            i = e.user,
            o = Object(s.useState)(''),
            l = Object(r.a)(o, 2),
            u = l[0],
            d = l[1],
            E = Object(s.useState)(
              Array.isArray(a.submissionContent) ? a.submissionContent : []
            ),
            v = Object(r.a)(E, 2),
            j = v[0],
            T = v[1],
            _ = Object(s.useState)(!1),
            L = Object(r.a)(_, 2),
            I = L[0],
            A = L[1],
            R = function(e) {
              return function(t) {
                var a = Object(n.a)(j);
                (a[e] = t), T(a);
              };
            },
            P =
              0 === j.length ||
              j.includes(void 0) ||
              (a.copiedQuestions && j.length < a.copiedQuestions.length);
          j.forEach(function(e) {
            (e &&
              ('string' != typeof e || 0 !== Object(O.f)(e).length) &&
              (('pdf' !== a.submissionType && 'zip' !== a.submissionType) ||
                e.url) &&
              ('mailchimp' !== a.submissionType ||
                'object' != typeof e ||
                e.body)) ||
              (P = !0);
          });
          var B = a.submitted;
          return (
            Object(s.useEffect)(function() {
              a.assessmentId && (d(a.id), Object(C.a)(a, i));
            }, []),
            Object(s.useEffect)(
              function() {
                a.assessmentId &&
                  (a.copiedQuestions || 0 === a.questionsDisplayed) &&
                  d(a.id);
              },
              [a.id]
            ),
            Object(s.useEffect)(
              function() {
                a.submissionContent &&
                  Array.isArray(a.submissionContent) &&
                  T(a.submissionContent),
                  ('ideo' === a.submissionType && !a.smartLink) || a.smartLink;
              },
              [a.submissionContent]
            ),
            u
              ? c.a.createElement(
                  c.a.Fragment,
                  null,
                  c.a.createElement(
                    'div',
                    { className: t.section },
                    c.a.createElement(
                      p.a,
                      { variant: 'h6', gutterBottom: !0 },
                      c.a.createElement(
                        m.a,
                        { container: !0, alignItems: 'center' },
                        c.a.createElement(
                          b.default,
                          { className: t.paddedIcon },
                          c.a.createElement(y.a, null)
                        ),
                        'Instructions'
                      )
                    ),
                    c.a.createElement('div', {
                      className: t.renderedHtml,
                      dangerouslySetInnerHTML: { __html: a.taskInstructions },
                    })
                  ),
                  a.copiedQuestions &&
                    a.copiedQuestions.map(function(e, t) {
                      return c.a.createElement(N.default, {
                        key: t,
                        questionNum: t + 1,
                        questionText: e,
                        mcEmail: a.mcEmail,
                        submissionType: a.submissionType,
                        answer: j[t],
                        setAnswer: R(t),
                        user: i,
                        readOnly: B,
                      });
                    }),
                  !a.copiedQuestions &&
                    c.a.createElement(N.default, {
                      questionNum: -1,
                      questionText: '',
                      mcEmail: a.mcEmail,
                      smartLink: a.smartLink,
                      submissionType: a.submissionType,
                      answer: j[0],
                      setAnswer: R(0),
                      user: i,
                      readOnly: B,
                    }),
                  'ideo' !== a.submissionType &&
                    c.a.createElement(
                      m.a,
                      {
                        container: !0,
                        alignItems: 'baseline',
                        className: t.section,
                      },
                      c.a.createElement(
                        g.a,
                        {
                          variant: 'contained',
                          color: 'primary',
                          onClick: function() {
                            Object(w.d)(
                              ''
                                .concat(k.COLLECTIONS.users, '/')
                                .concat(i.id, '/')
                                .concat(k.COLLECTIONS.assessments),
                              u,
                              {
                                outcome: 'pending',
                                screened: !1,
                                submissionContent: j,
                                submitted: !0,
                              }
                            ).then(function() {
                              console.log('Submitted'),
                                window.scrollTo({
                                  top: 0,
                                  left: 0,
                                  behavior: 'smooth',
                                });
                            });
                          },
                          size: 'large',
                          id: 'submit-'.concat(!P),
                          className: t.submitButton,
                          disabled: P || B,
                        },
                        B ? 'Submitted' : 'Submit',
                        B
                          ? c.a.createElement(x.a, null)
                          : c.a.createElement(S.a, null)
                      ),
                      !B &&
                        c.a.createElement(
                          g.a,
                          {
                            variant: 'outlined',
                            color: 'primary',
                            onClick: function() {
                              Object(w.d)(
                                ''
                                  .concat(k.COLLECTIONS.users, '/')
                                  .concat(i.id, '/')
                                  .concat(k.COLLECTIONS.assessments),
                                u,
                                {
                                  outcome: 'pending',
                                  screened: !1,
                                  submissionContent: j,
                                  submitted: !1,
                                }
                              ).then(function() {
                                console.log('Saved'), A(!0);
                              });
                            },
                            size: 'large',
                            className: t.saveButton,
                          },
                          'Save',
                          c.a.createElement(x.a, null)
                        )
                    ),
                  c.a.createElement(f.a, {
                    className: t.snackbar,
                    open: I,
                    autoHideDuration: 3e3,
                    onClose: function() {
                      A(!1);
                    },
                    message: c.a.createElement(
                      c.a.Fragment,
                      null,
                      c.a.createElement(x.a, { className: t.savedTick }),
                      'Saved'
                    ),
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                  })
                )
              : c.a.createElement(h.a, { className: t.loading })
          );
        })
      );
    },
    487: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(0),
        o = a.n(i),
        s = a(64),
        c = a(16),
        l = a.n(c),
        u = a(278),
        d = a(7),
        m = a.n(d),
        p = a(9),
        g = a(36),
        h = a(281),
        f = a(80),
        b = a.n(f),
        E = a(180),
        y = a(485),
        v = a(486),
        x = a(5),
        j = a(488),
        S = a(77),
        N = a(141),
        k = a(13),
        O = a(59),
        w = a(222),
        C = a(116),
        T = a(371);
      t.default = Object(s.a)(
        m()(
          function(e) {
            return Object(r.a)({}, x.STYLES.DETAIL_VIEW(e), {
              meta: { marginTop: e.spacing(1.5), marginBottom: e.spacing(3) },
              getStarted: {
                fontSize: e.spacing(2),
                borderRadius: 200,
                transition: e.transitions.create(['transform', 'box-shadow']),
              },
              getStartedSection: {
                transition: e.transitions.create(['transform', 'margin-top']),
                transformOrigin: '0 100%',
                margin: ''
                  .concat(e.spacing(4), 'px 0 ')
                  .concat(e.spacing(6), 'px'),
              },
              gotStarted: { transform: 'scale(0)', marginTop: -64 },
              resubmitted: {
                marginTop: e.spacing(1),
                marginLeft: e.spacing(1),
              },
              resubmittedLink: { verticalAlign: 'baseline' },
              coursesWrapper: { margin: '0 -'.concat(e.spacing(1), 'px') },
              hideOnPrint: { '@media print': { display: 'none' } },
            });
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.theme,
            s = e.data,
            c = e.history,
            d = s && s.assessmentId,
            m = Object(i.useState)(!1),
            f = Object(n.a)(m, 2),
            _ = f[0],
            L = f[1],
            I = Object(i.useState)(d),
            A = Object(n.a)(I, 2),
            R = A[0],
            P = A[1],
            B = Object(u.a)(a.breakpoints.down('xs')),
            W = Object(i.useContext)(O.a).user;
          Object(i.useEffect)(
            function() {
              P(!!d);
            },
            [s]
          );
          var D = Object(C.a)(),
            q = Object(n.a)(D, 2),
            M = q[0],
            H = q[1],
            F = M.documents;
          return (
            Object(i.useEffect)(
              function() {
                H({
                  path: x.COLLECTIONS.courses,
                  filters: [
                    {
                      field: 'skillsAssociated',
                      operator: 'array-contains',
                      value: { id: s.assessmentId || s.id, title: s.title },
                    },
                    { field: 'published', operator: '==', value: !0 },
                  ],
                });
              },
              [s.id]
            ),
            Object(i.useEffect)(
              function() {
                console.log('suggestedCourses', F);
              },
              [F]
            ),
            _
              ? o.a.createElement(S.default, {
                  contained: !0,
                  message: 'Creating submission\u2026',
                })
              : o.a.createElement(
                  'div',
                  { className: t.root },
                  o.a.createElement(E.default, { className: t.backButton }),
                  o.a.createElement(
                    'main',
                    { className: t.content },
                    o.a.createElement('div', {
                      style:
                        s.image && s.image.url
                          ? { backgroundImage: 'url('.concat(s.image.url, ')') }
                          : {},
                      className: t.coverImage,
                    }),
                    o.a.createElement(
                      p.a,
                      {
                        variant: B ? 'h5' : 'h4',
                        className: t.title,
                        style: B ? { fontWeight: 500 } : {},
                      },
                      s.title
                    ),
                    o.a.createElement(y.default, {
                      data: s,
                      className: t.meta,
                    }),
                    o.a.createElement(j.default, { data: s, isXs: B }),
                    s.briefing && s.briefing.length > 0
                      ? o.a.createElement(
                          'div',
                          { className: t.section },
                          o.a.createElement('div', {
                            className: t.renderedHtml,
                            dangerouslySetInnerHTML: { __html: s.briefing },
                          })
                        )
                      : o.a.createElement(
                          o.a.Fragment,
                          null,
                          o.a.createElement(
                            'div',
                            { className: t.section },
                            o.a.createElement(
                              p.a,
                              {
                                variant: 'h6',
                                gutterBottom: !0,
                                className: t.subtitle,
                              },
                              'The company'
                            ),
                            o.a.createElement('div', {
                              className: t.renderedHtml,
                              dangerouslySetInnerHTML: {
                                __html: s.companyDescription,
                              },
                            })
                          ),
                          o.a.createElement(
                            'div',
                            { className: t.section },
                            o.a.createElement(
                              p.a,
                              {
                                variant: 'h6',
                                gutterBottom: !0,
                                className: t.subtitle,
                              },
                              'Your job'
                            ),
                            o.a.createElement('div', {
                              className: t.renderedHtml,
                              dangerouslySetInnerHTML: {
                                __html: s.jobDescription,
                              },
                            })
                          )
                        ),
                    s.relatedMaterial &&
                      o.a.createElement(
                        'div',
                        { className: t.section },
                        o.a.createElement(
                          p.a,
                          {
                            variant: 'h6',
                            gutterBottom: !0,
                            className: t.subtitle,
                          },
                          'Related material'
                        ),
                        o.a.createElement('div', {
                          className: t.renderedHtml,
                          dangerouslySetInnerHTML: {
                            __html: s.relatedMaterial,
                          },
                        })
                      ),
                    o.a.createElement(
                      'div',
                      {
                        className: l()(
                          t.section,
                          t.getStartedSection,
                          R && t.gotStarted
                        ),
                      },
                      o.a.createElement(
                        g.a,
                        {
                          variant: 'contained',
                          color: 'primary',
                          size: 'large',
                          id: 'getStarted',
                          className: t.getStarted,
                          onClick: function(e) {
                            L(!0), Object(w.b)(s, W, c);
                          },
                          disabled: !!s.resubmitted,
                        },
                        'Get started',
                        o.a.createElement(b.a, null)
                      ),
                      !!s.resubmitted &&
                        o.a.createElement(
                          p.a,
                          { variant: 'body2', className: t.resubmitted },
                          'You have already created a',
                          ' ',
                          o.a.createElement(
                            h.a,
                            {
                              component: 'button',
                              variant: 'body2',
                              className: t.resubmittedLink,
                              onClick: function() {
                                c.push(
                                  ''
                                    .concat(k.a, '?id=')
                                    .concat(s.resubmitted, '&yours=true')
                                );
                              },
                            },
                            'new submission'
                          ),
                          '.'
                        )
                    ),
                    R && o.a.createElement(v.default, { data: s, user: W }),
                    F.length > 0 &&
                      o.a.createElement(
                        'div',
                        { className: l()(t.section, t.hideOnPrint) },
                        o.a.createElement(
                          p.a,
                          {
                            variant: 'h6',
                            gutterBottom: !0,
                            className: t.subtitle,
                          },
                          'Need some help?'
                        ),
                        o.a.createElement(
                          p.a,
                          { variant: 'body1', gutterBottom: !0 },
                          'Check out this short online course and learn the skills you need to complete this task.'
                        ),
                        o.a.createElement(
                          'div',
                          { className: t.coursesWrapper },
                          F.map(function(e) {
                            return o.a.createElement(
                              N.default,
                              Object.assign(
                                { key: e.id },
                                Object(T.course)(Object(r.a)({}, e))
                              )
                            );
                          })
                        )
                      )
                  )
                )
          );
        })
      );
    },
    488: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(7),
        s = a.n(o),
        c = a(11),
        l = a(9),
        u = a(79),
        d = a(108),
        m = a.n(d),
        p = a(100),
        g = a(107),
        h = a.n(g),
        f = a(374),
        b = a.n(f),
        E = a(273);
      t.default = s()(function(e) {
        return {
          root: {
            marginTop: e.spacing(3),
            padding: e.spacing(3),
            borderRadius: e.shape.borderRadius,
            boxShadow: e.shadowsLight[24],
          },
          paddedIcon: Object(n.a)(
            { marginRight: e.spacing(2) },
            e.breakpoints.down('xs'),
            { marginBottom: e.spacing(1) }
          ),
          title: { marginTop: e.spacing(0.25), marginBottom: e.spacing(0.5) },
        };
      })(function(e) {
        var t = e.classes,
          a = e.data,
          n = e.isXs,
          r = null,
          o = null,
          s = null,
          d = null;
        if (a.submitted && !a.screened)
          (r = i.a.createElement(
            u.default,
            { className: t.paddedIcon },
            i.a.createElement(m.a, { style: { marginRight: -4 } })
          )),
            (o = 'Submitted'),
            (s = 'Sit tight! We\u2019ll review your submission shortly.');
        else {
          if (!a.submitted || !a.screened) return null;
          'pass' === a.outcome
            ? ((r = i.a.createElement(
                u.default,
                { className: t.paddedIcon, color: 'green' },
                i.a.createElement(p.a, null)
              )),
              (o = 'Passed'),
              (s = i.a.createElement(
                i.a.Fragment,
                null,
                'Congratulations! You\u2019ve earned the ',
                i.a.createElement('b', null, a.title),
                ' badge.'
              )),
              (d = i.a.createElement(E.default, { data: a })))
            : 'fail' === a.outcome
            ? ((r = i.a.createElement(
                u.default,
                { className: t.paddedIcon, color: 'red' },
                i.a.createElement(h.a, null)
              )),
              (o = 'Unsuccessful'),
              (s = 'Your submission did not meet our standards.'),
              (d = i.a.createElement(E.default, { data: a })))
            : 'disqualify' === a.outcome &&
              ((r = i.a.createElement(
                u.default,
                { className: t.paddedIcon, color: 'red' },
                i.a.createElement(b.a, null)
              )),
              (o = 'Disqualified'),
              (s = 'Your submission was disqualified.'),
              (d = i.a.createElement(E.default, { data: a })));
        }
        return i.a.createElement(
          c.a,
          {
            container: !0,
            className: t.root,
            alignItems: 'flex-start',
            direction: n ? 'column' : 'row',
          },
          i.a.createElement(c.a, { item: !0, className: t.iconWrapper }, r),
          i.a.createElement(
            c.a,
            { item: !0, xs: !0 },
            i.a.createElement(l.a, { variant: 'h6', className: t.title }, o),
            i.a.createElement(l.a, { variant: 'body1' }, s),
            d
          )
        );
      });
    },
    489: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(17),
        o = a(0),
        s = a.n(o),
        c = a(7),
        l = a.n(c),
        u = a(11),
        d = a(9),
        m = a(282),
        p = a(36),
        g = a(725),
        h = a.n(g),
        f = a(377),
        b = a.n(f),
        E = a(261),
        y = a(5),
        v = a(45);
      t.default = l()(function(e) {
        return {
          avatar: Object(i.a)({ marginBottom: 0 }, e.breakpoints.down('xs'), {
            marginLeft: -e.spacing(1) / 2,
          }),
          name: Object(i.a)(
            { fontWeight: 500, marginTop: 16, marginBottom: e.spacing(1.5) },
            e.breakpoints.down('xs'),
            { marginTop: 0 }
          ),
          editBar: { marginBottom: e.spacing(0.5) },
          editIcon: { marginRight: -e.spacing(1) },
          bioLength: { display: 'inline-block', marginRight: e.spacing(1) },
          textFieldRoot: Object(r.a)(
            {
              margin: '-10px -12px',
              paddingTop: 10,
              width: 'calc(100% + 24px)',
            },
            e.typography.body2
          ),
          bio: { whiteSpace: 'pre-line' },
        };
      })(function(e) {
        var t = e.classes,
          a = e.data,
          r = e.user,
          i = e.isMobile,
          c = Object(o.useState)(!1),
          l = Object(n.a)(c, 2),
          g = l[0],
          f = l[1],
          x = Object(o.useState)(a.bio ? a.bio.substr(0, 1e3) : ''),
          j = Object(n.a)(x, 2),
          S = j[0],
          N = j[1];
        return s.a.createElement(
          u.a,
          {
            container: !0,
            direction: i ? 'column' : 'row',
            className: t.root,
            spacing: i ? 1 : 3,
          },
          s.a.createElement(
            u.a,
            { item: !0 },
            s.a.createElement(E.default, {
              avatarURL: r.avatarURL,
              firstName: r.firstName,
              lastName: r.lastName,
              classes: { avatarButton: t.avatar },
            })
          ),
          s.a.createElement(
            u.a,
            { item: !0, xs: !0 },
            s.a.createElement(
              d.a,
              { variant: 'h5', className: t.name },
              r.firstName,
              ' ',
              r.lastName
            ),
            s.a.createElement(
              u.a,
              { container: !0, alignItems: 'center', className: t.editBar },
              s.a.createElement(
                u.a,
                { item: !0, xs: !0 },
                s.a.createElement(d.a, { variant: 'subtitle1' }, 'Your Bio')
              ),
              s.a.createElement(
                u.a,
                { item: !0 },
                g &&
                  s.a.createElement(
                    d.a,
                    { variant: 'caption', className: t.bioLength },
                    S.length,
                    '/',
                    1e3
                  ),
                g
                  ? s.a.createElement(
                      p.a,
                      {
                        className: t.editIcon,
                        color: 'primary',
                        id: 'bio-submit',
                        onClick: function() {
                          f(!1),
                            S !== a.bio &&
                              Object(v.d)(y.COLLECTIONS.profiles, r.id, {
                                bio: S,
                              });
                        },
                      },
                      'Save',
                      s.a.createElement(b.a, null)
                    )
                  : s.a.createElement(
                      p.a,
                      {
                        color: 'primary',
                        id: 'bio-edit',
                        className: t.editIcon,
                        onClick: function() {
                          f(!0);
                        },
                      },
                      'Edit',
                      s.a.createElement(h.a, null)
                    )
              )
            ),
            g
              ? s.a.createElement(m.a, {
                  id: 'bio-input',
                  autoFocus: !0,
                  fullWidth: !0,
                  multiline: !0,
                  variant: 'filled',
                  margin: 'none',
                  InputProps: {
                    disableUnderline: !0,
                    classes: { root: t.textFieldRoot },
                  },
                  value: S,
                  onChange: function(e) {
                    N(e.target.value.substr(0, 1e3));
                  },
                })
              : s.a.createElement(
                  d.a,
                  {
                    variant: 'body2',
                    className: t.bio,
                    color: a.bio ? 'textPrimary' : 'textSecondary',
                  },
                  a.bio ||
                    'You don\u2019t have a bio yet. Click the edit button above to get started.'
                )
          )
        );
      });
    },
    490: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(0),
        o = a.n(i),
        s = a(64),
        c = a(7),
        l = a.n(c),
        u = a(11),
        d = a(9),
        m = a(117),
        p = a(508),
        g = a(36),
        h = a(79),
        f = a(100),
        b = a(67),
        E = a.n(b),
        y = a(122),
        v = a.n(y),
        x = a(155),
        j = a(13);
      t.default = Object(s.a)(
        l()(function(e) {
          return Object(r.a)({}, Object(x.profileStyles)(e));
        })(function(e) {
          var t = e.classes,
            a = e.data,
            r = e.isMobile,
            s = e.history,
            c = Object(i.useState)(null),
            l = Object(n.a)(c, 2),
            b = l[0],
            y = l[1];
          return o.a.createElement(
            u.a,
            {
              container: !0,
              direction: r ? 'column' : 'row',
              className: t.root,
              spacing: r ? 1 : 3,
            },
            o.a.createElement(
              u.a,
              { item: !0 },
              o.a.createElement(
                h.default,
                { className: t.paddedIcon },
                o.a.createElement(f.a, null)
              )
            ),
            o.a.createElement(
              u.a,
              { item: !0, xs: !0 },
              o.a.createElement(
                u.a,
                {
                  container: !0,
                  alignItems: 'center',
                  className: t.titleWrapper,
                },
                o.a.createElement(
                  u.a,
                  { item: !0, xs: !0 },
                  o.a.createElement(
                    d.a,
                    { variant: 'h5', className: t.title },
                    'Your Skills'
                  )
                ),
                o.a.createElement(
                  u.a,
                  { item: !0, className: t.infoPopper },
                  o.a.createElement(
                    m.a,
                    {
                      id: 'info-button-assessments',
                      onClick: function(e) {
                        y(e.currentTarget);
                      },
                    },
                    o.a.createElement(v.a, null)
                  ),
                  o.a.createElement(
                    p.a,
                    {
                      open: !!b,
                      anchorEl: b,
                      onClose: function() {
                        y(null);
                      },
                      anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                      transformOrigin: { vertical: 'top', horizontal: 'right' },
                    },
                    o.a.createElement(
                      d.a,
                      { className: t.infoPopperText },
                      'Your assessment submissions will be seen by potential employers when you apply for jobs.'
                    )
                  )
                )
              ),
              0 === a.length &&
                o.a.createElement(
                  o.a.Fragment,
                  null,
                  o.a.createElement(
                    d.a,
                    { variant: 'body1', color: 'textSecondary' },
                    'Your verified skills will appear here after you complete and pass tasks.'
                  ),
                  o.a.createElement(
                    g.a,
                    {
                      color: 'primary',
                      className: t.browseButton,
                      onClick: function() {
                        s.push(j.b);
                      },
                    },
                    'Browse Tasks',
                    o.a.createElement(E.a, null)
                  )
                ),
              a.map(function(e) {
                return o.a.createElement(
                  u.a,
                  { container: !0, key: e.id, className: t.item },
                  o.a.createElement(
                    u.a,
                    { item: !0 },
                    o.a.createElement(f.a, { className: t.itemIcon })
                  ),
                  o.a.createElement(
                    u.a,
                    { item: !0, xs: !0 },
                    o.a.createElement(
                      d.a,
                      { variant: 'subtitle1', className: t.itemTitle },
                      e.title
                    ),
                    o.a.createElement(
                      g.a,
                      {
                        color: 'primary',
                        size: 'small',
                        className: t.itemButton,
                        onClick: function() {
                          s.push(
                            ''.concat(j.a, '?id=').concat(e.id, '&yours=true')
                          );
                        },
                      },
                      'View submission',
                      o.a.createElement(E.a, null)
                    )
                  )
                );
              })
            )
          );
        })
      );
    },
    491: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(14),
        r = a(0),
        i = a.n(r),
        o = a(64),
        s = a(16),
        c = a.n(s),
        l = a(7),
        u = a.n(l),
        d = a(11),
        m = a(9),
        p = a(36),
        g = a(79),
        h = a(70),
        f = a.n(h),
        b = a(67),
        E = a.n(b),
        y = a(158),
        v = a(155),
        x = a(13);
      t.default = Object(o.a)(
        u()(function(e) {
          return Object(
            n.a
          )({}, Object(v.profileStyles)(e), { skillsWrapper: { marginLeft: -e.spacing(1) } });
        })(function(e) {
          var t = e.classes,
            a = e.data,
            n = e.isMobile,
            r = e.history;
          return i.a.createElement(
            d.a,
            {
              container: !0,
              direction: n ? 'column' : 'row',
              className: t.root,
              spacing: n ? 1 : 3,
            },
            i.a.createElement(
              d.a,
              { item: !0 },
              i.a.createElement(
                g.default,
                { className: t.paddedIcon },
                i.a.createElement(f.a, null)
              )
            ),
            i.a.createElement(
              d.a,
              { item: !0, xs: !0 },
              i.a.createElement(
                m.a,
                { variant: 'h5', className: c()(t.title, t.titleWrapper) },
                'Your Courses'
              ),
              0 === a.length &&
                i.a.createElement(
                  i.a.Fragment,
                  null,
                  i.a.createElement(
                    m.a,
                    { variant: 'body1', color: 'textSecondary' },
                    'Courses you complete will appear here.'
                  ),
                  i.a.createElement(
                    p.a,
                    {
                      color: 'primary',
                      className: t.browseButton,
                      onClick: function() {
                        r.push(x.c);
                      },
                    },
                    'Browse Courses',
                    i.a.createElement(E.a, null)
                  )
                ),
              a.map(function(e) {
                return i.a.createElement(
                  d.a,
                  { container: !0, key: e.id, className: t.item },
                  i.a.createElement(
                    d.a,
                    { item: !0 },
                    i.a.createElement(f.a, { className: t.itemIcon })
                  ),
                  i.a.createElement(
                    d.a,
                    { item: !0, xs: !0 },
                    i.a.createElement(
                      m.a,
                      { variant: 'subtitle1', className: t.itemTitle },
                      e.title,
                      i.a.createElement(
                        p.a,
                        {
                          color: 'primary',
                          size: 'small',
                          className: t.itemButton,
                          onClick: function() {
                            r.push(''.concat(x.d, '?id=').concat(e.id));
                          },
                        },
                        'View',
                        i.a.createElement(E.a, null)
                      )
                    ),
                    i.a.createElement(
                      m.a,
                      { variant: 'body2' },
                      'Skills related'
                    ),
                    i.a.createElement(
                      'div',
                      { className: t.skillsWrapper },
                      e.skillsAssociated.map(function(e) {
                        return i.a.createElement(y.a, { key: e, value: e });
                      })
                    )
                  )
                );
              })
            )
          );
        })
      );
    },
    492: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(0),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(11),
        u = a(9),
        d = a(117),
        m = a(508),
        p = a(511),
        g = a(79),
        h = a(726),
        f = a.n(h),
        b = a(122),
        E = a.n(b),
        y = a(157),
        v = a.n(y),
        x = a(155),
        j = a(262);
      t.default = c()(function(e) {
        return Object(
          r.a
        )({}, Object(x.profileStyles)(e), { newResumeMsg: { marginTop: e.spacing(2), marginBottom: -e.spacing(1) }, uploader: { marginTop: e.spacing(2) }, fileChip: { marginLeft: -e.spacing(1) / 2, cursor: 'pointer' }, fileIcon: { transform: 'rotate(-45deg)' } });
      })(function(e) {
        var t = e.classes,
          a = e.data,
          r = e.isMobile,
          s = Object(i.useState)(null),
          c = Object(n.a)(s, 2),
          h = c[0],
          b = c[1];
        return o.a.createElement(
          l.a,
          {
            container: !0,
            direction: r ? 'column' : 'row',
            className: t.root,
            spacing: r ? 1 : 3,
          },
          o.a.createElement(
            l.a,
            { item: !0 },
            o.a.createElement(
              g.default,
              { className: t.paddedIcon },
              o.a.createElement(f.a, null)
            )
          ),
          o.a.createElement(
            l.a,
            { item: !0, xs: !0 },
            o.a.createElement(
              l.a,
              {
                container: !0,
                alignItems: 'center',
                className: t.titleWrapper,
              },
              o.a.createElement(
                l.a,
                { item: !0, xs: !0 },
                o.a.createElement(
                  u.a,
                  { variant: 'h5', className: t.title },
                  'Your Resume'
                )
              ),
              o.a.createElement(
                l.a,
                { item: !0, className: t.infoPopper },
                o.a.createElement(
                  d.a,
                  {
                    id: 'info-button-resume',
                    onClick: function(e) {
                      b(e.currentTarget);
                    },
                  },
                  o.a.createElement(E.a, null)
                ),
                o.a.createElement(
                  m.a,
                  {
                    open: !!h,
                    anchorEl: h,
                    onClose: function() {
                      b(null);
                    },
                    anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
                    transformOrigin: { vertical: 'top', horizontal: 'right' },
                  },
                  o.a.createElement(
                    u.a,
                    { className: t.infoPopperText },
                    'Your resume, excluding personal information, can be seen by potential employers, if approved by 2hats.'
                  )
                )
              )
            ),
            a && a.url
              ? o.a.createElement(
                  o.a.Fragment,
                  null,
                  o.a.createElement(p.a, {
                    id: 'resume-chip',
                    component: 'a',
                    href: a.url,
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    label: a.name,
                    className: t.fileChip,
                    icon: o.a.createElement(v.a, { className: t.fileIcon }),
                  }),
                  o.a.createElement(
                    u.a,
                    {
                      variant: 'body1',
                      color: 'textSecondary',
                      className: t.newResumeMsg,
                    },
                    'You can upload a new resume below.'
                  )
                )
              : o.a.createElement(
                  u.a,
                  { variant: 'body1', color: 'textSecondary' },
                  'It looks like you haven\u2019t uploaded your resume yet. Uploading a resume will make applying for jobs faster and make it easier for us to see what best suits you.'
                ),
            o.a.createElement(j.default, {
              className: t.uploader,
              resetOnUpload: !0,
            })
          )
        );
      });
    },
    493: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(7),
        s = a.n(o),
        c = a(162),
        l = a(36),
        u = a(9),
        d = a(365),
        m = a.n(d),
        p = a(274),
        g = s()(function(e) {
          return {
            root: {
              backgroundColor: e.palette.grey[300],
              borderRadius: '50%',
              width: 64,
              height: 64,
              marginBottom: e.spacing(0.5),
              marginRight: e.spacing(0.5),
              '&:hover, &:focus': {
                backgroundColor: Object(c.emphasize)(e.palette.grey[300], 0.08),
              },
              '&:active': {
                boxShadow: e.shadows[1],
                backgroundColor: Object(c.emphasize)(e.palette.grey[300], 0.12),
              },
            },
            label: { flexDirection: 'column' },
            disabled: { opacity: 0.5 },
            date: { fontWeight: 500, marginTop: -e.spacing(1) / 2 },
            containedPrimary: {
              backgroundColor: e.palette.primary.main,
              '&:hover, &:focus': {
                backgroundColor: Object(c.emphasize)(
                  e.palette.primary.main,
                  0.08
                ),
              },
              '&:active': {
                backgroundColor: Object(c.emphasize)(
                  e.palette.primary.main,
                  0.12
                ),
              },
            },
          };
        })(function(e) {
          var t = e.classes,
            a = e.date,
            n = e.selected,
            r = e.onClick,
            o = e.disabled;
          return i.a.createElement(
            l.a,
            {
              classes: {
                root: t.root,
                label: t.label,
                disabled: t.disabled,
                containedPrimary: t.containedPrimary,
              },
              variant: n ? 'contained' : 'text',
              color: n ? 'primary' : 'default',
              onClick: r,
              disabled: o || a <= p.a,
              disableRipple: !0,
            },
            i.a.createElement(
              u.a,
              { variant: 'body2', color: 'inherit' },
              a.format('ddd')
            ),
            i.a.createElement(
              u.a,
              { variant: 'h5', color: 'inherit', className: t.date },
              a.format('D')
            )
          );
        });
      t.default = function(e) {
        var t = e.selectedDate,
          a = e.setSelectedDate,
          o = e.dates,
          s = e.timeslots,
          c = Object(r.useState)(!1),
          u = Object(n.a)(c, 2),
          d = u[0],
          p = u[1],
          h = o.slice(0, 5),
          f = o.slice(5, 10);
        return i.a.createElement(
          i.a.Fragment,
          null,
          h.map(function(e, n) {
            return i.a.createElement(g, {
              key: e.inspect(),
              date: e,
              selected: e.isSame(t),
              onClick: function() {
                a(e);
              },
              disabled: 0 === s[n].length,
            });
          }),
          i.a.createElement('br', null),
          d
            ? f.map(function(e, n) {
                return i.a.createElement(g, {
                  key: e.inspect(),
                  date: e,
                  selected: e.isSame(t),
                  onClick: function() {
                    a(e);
                  },
                  disabled: 0 === s[n + 5].length,
                });
              })
            : i.a.createElement(
                l.a,
                {
                  color: 'primary',
                  onClick: function() {
                    p(!0);
                  },
                },
                'Next week',
                i.a.createElement(m.a, null)
              )
        );
      };
    },
    494: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(511),
        c = a(9),
        l = o()(function(e) {
          return {
            root: {
              marginBottom: e.spacing(1),
              fontSize: '.9375rem',
              borderRadius: 200,
              width: 164,
              textAlign: 'center',
              '&:not(:last-of-type)': { marginRight: e.spacing(0.75) },
            },
            label: {
              paddingLeft: e.spacing(1.25),
              paddingRight: e.spacing(1.25),
            },
          };
        })(function(e) {
          var t = e.classes,
            a = e.timeslot,
            n = e.selected,
            i = e.onClick;
          return r.a.createElement(s.a, {
            classes: t,
            color: n ? 'primary' : 'default',
            onClick: i,
            label: a,
          });
        });
      t.default = function(e) {
        var t = e.selectedTime,
          a = e.setSelectedTime,
          n = e.timeslots;
        return !n || n.length < 0
          ? r.a.createElement(
              c.a,
              { variant: 'subtitle1' },
              'No time slots available'
            )
          : n.map(function(e) {
              return r.a.createElement(l, {
                key: e,
                timeslot: e,
                selected: e === t,
                onClick: function() {
                  a(e);
                },
              });
            });
      };
    },
    496: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(50),
        i = a(51),
        o = a(54),
        s = a(52),
        c = a(30),
        l = a(53),
        u = a(0),
        d = a.n(u),
        m = a(461),
        p = a(21),
        g = a(36);
      function h(e) {
        return /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          String(e).toLowerCase()
        );
      }
      var f = a(7),
        b = a.n(f),
        E = a(9),
        y = a(11),
        v = a(281),
        x = a(687),
        j = a.n(x),
        S = a(41),
        N = new j.a('pubkey-39aac6f76384240d4c4b3a2b1afeaf02'),
        k = (function(e) {
          function t(e) {
            var a;
            return (
              Object(r.a)(this, t),
              ((a = Object(o.a)(
                this,
                Object(s.a)(t).call(this, e)
              )).handleChange = function(e) {
                return function(t) {
                  a.setState(Object(n.a)({}, e, t.target.value));
                };
              }),
              (a.state = {
                email: a.props.urlParams.email || '',
                invalidEmail: !1,
              }),
              (a.onNext = a.onNext.bind(Object(c.a)(a))),
              (a.handleChange = a.handleChange.bind(Object(c.a)(a))),
              (a.handleEmailCheck = a.handleEmailCheck.bind(Object(c.a)(a))),
              (a.handleValidation = a.handleValidation.bind(Object(c.a)(a))),
              (a.handleValidEmail = a.handleValidEmail.bind(Object(c.a)(a))),
              (a.handleInvalidEmail = a.handleInvalidEmail.bind(
                Object(c.a)(a)
              )),
              (a.handleEmailSuggestion = a.handleEmailSuggestion.bind(
                Object(c.a)(a)
              )),
              a
            );
          }
          return (
            Object(l.a)(t, e),
            Object(i.a)(t, [
              {
                key: 'handleInvalidEmail',
                value: function() {
                  this.props.changeHandler('isLoading', !1),
                    this.props.changeHandler('snackBar', {
                      message:
                        'It looks like you entered your email address incorrectly.',
                      variant: 'warning',
                    });
                },
              },
              {
                key: 'handleValidEmail',
                value: function(e) {
                  this.props.changeHandler('isLoading', !1),
                    this.props.changeHandler('email', this.state.email),
                    this.setState({ invalidEmail: !1 }),
                    e || this.props.changeHandler('view', 'signup');
                },
              },
              {
                key: 'handleEmailSuggestion',
                value: function(e) {
                  this.setState({ emailSuggestion: e });
                },
              },
              {
                key: 'handleValidation',
                value: function(e) {
                  var t = this.handleValidEmail,
                    a = this.handleInvalidEmail,
                    n = this.handleEmailSuggestion;
                  N.validate(e, function(e, r) {
                    if (e) return t(!1), void console.log(e);
                    r.is_valid
                      ? (console.log('valid', r),
                        t(r.did_you_mean),
                        r.did_you_mean && n(r.did_you_mean))
                      : (console.log(r),
                        a(),
                        r.did_you_mean && n(r.did_you_mean));
                  });
                },
              },
              {
                key: 'handleEmailCheck',
                value: function(e) {
                  var t = this;
                  h(e)
                    ? (this.props.changeHandler('isLoading', !0),
                      (function(e, t, a) {
                        var n = { email: e.toLowerCase() };
                        Object(p.b)(
                          p.a.CHECK_EMAIL,
                          n,
                          function(e) {
                            console.log('Call checkEmail success: ', e), t(e);
                          },
                          function(e) {
                            console.log('Call checkEmail error: ', e.message),
                              a(e);
                          }
                        );
                      })(
                        e,
                        function(a) {
                          var n = a.data,
                            r = n.firstName,
                            i = n.provider,
                            o = n.noPassword;
                          t.props.changeHandler('isLoading', !1),
                            t.props.changeHandler('email', e),
                            t.props.changeHandler('firstName', r),
                            o
                              ? t.props.changeHandler('view', S.a.noPassword)
                              : 'linkedin' === i
                              ? t.props.changeHandler('view', 'noPassword')
                              : t.props.changeHandler('view', i),
                            t.props.changeHandler('snackBar', null);
                        },
                        function(a) {
                          t.handleValidation(e);
                        }
                      ))
                    : this.props.changeHandler('snackBar', {
                        message: 'Invalid email format',
                        variant: 'error',
                      });
                },
              },
              {
                key: 'onNext',
                value: function() {
                  this.props.changeHandler('snackBar', null),
                    this.setState({ emailSuggestion: null }),
                    this.handleEmailCheck(this.state.email);
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this,
                    t = this.state,
                    a = t.email,
                    n = t.emailSuggestion,
                    r = t.invalidEmail,
                    i = this.props.classes;
                  return d.a.createElement(
                    y.a,
                    {
                      className: i.grid,
                      container: !0,
                      direction: 'column',
                      alignItems: 'center',
                      justify: 'space-between',
                    },
                    d.a.createElement(
                      'div',
                      { style: { width: '100%', marginTop: n ? -5 : 15 } },
                      d.a.createElement(m.default, {
                        key: 'emailField',
                        primaryAction: this.onNext,
                        value: a,
                        changeHandler: this.handleChange,
                      })
                    ),
                    n &&
                      d.a.createElement(
                        E.a,
                        { variant: 'body2', className: i.text },
                        'Did you mean:',
                        d.a.createElement('br', null),
                        d.a.createElement(
                          v.a,
                          {
                            component: 'button',
                            variant: 'body2',
                            className: i.link,
                            onClick: function() {
                              e.setState({ email: n }), e.handleEmailCheck(n);
                            },
                          },
                          n
                        ),
                        !r &&
                          d.a.createElement(
                            v.a,
                            {
                              component: 'button',
                              variant: 'body2',
                              className: i.link,
                              style: { color: '#000' },
                              onClick: function() {
                                e.handleValidEmail(!1);
                              },
                            },
                            'Ignore'
                          )
                      ),
                    d.a.createElement(
                      g.a,
                      {
                        key: 'check-button',
                        id: 'check-button',
                        variant: 'contained',
                        color: 'primary',
                        disabled: !h(a),
                        onClick: this.onNext,
                        className: i.button,
                      },
                      'Next'
                    )
                  );
                },
              },
            ]),
            t
          );
        })(u.Component);
      t.default = b()(function(e) {
        return {
          button: { width: 120 },
          grid: { height: 150, paddingBottom: 10 },
          text: { marginTop: -15, width: '100%' },
          link: {
            cursor: 'pointer',
            textDecoration: 'none',
            marginRight: 10,
            fontWeight: 'bold',
            '&:hover': { textDecoration: 'underline' },
          },
        };
      })(k);
    },
    497: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(14),
        r = a(12),
        i = a(0),
        o = a.n(i),
        s = a(223),
        c = a(25),
        l = a(37),
        u = a(101),
        d = function(e, t) {
          return e
            ? t.filter(function(t) {
                return t.value === e;
              })[0]
            : null;
        },
        m = [
          {
            value: 'unrestricted',
            label: 'Unrestricted (full working rights in Australia)',
          },
          {
            value: 'restricted',
            label: 'Restricted (up to 40 hours per fortnight)',
          },
        ],
        p = function(e) {
          return (
            e || (e = {}),
            [
              {
                type: c.a.textField,
                name: 'firstName',
                label: 'First Name',
                value: e.firstName,
                validation: l.string().required('Required'),
                width: 6,
              },
              {
                type: c.a.textField,
                name: 'lastName',
                label: 'Last Name',
                value: e.lastName,
                validation: l.string().required('Required'),
                width: 6,
              },
              {
                type: c.a.autocompleteFreeText,
                name: 'currentUniversity',
                label: 'Current University',
                value: e.currentUniversity && {
                  label: e.currentUniversity,
                  value: e.currentUniversity,
                },
                suggestions: u.a.map(function(e) {
                  return { label: e, value: e.split('\u2063')[0] };
                }),
                validation: l
                  .object({
                    value: l.string().required('Required'),
                    label: l.string(),
                  })
                  .required('Required'),
              },
              {
                type: c.a.textField,
                name: 'currentDegree',
                label: 'Current Degree',
                value: e.currentDegree,
                validation: l.string().required('Required'),
              },
              {
                type: c.a.autocomplete,
                name: 'workRestriction',
                label: 'Work Restriction',
                value: d(e.workRestriction, m),
                suggestions: m,
              },
              {
                type: c.a.slider,
                name: 'availableDays',
                label: 'Available Days',
                units: 'days',
                value: e.availableDays,
                min: 1,
                max: 5,
                step: 0.5,
                validation: l
                  .number()
                  .min(1)
                  .max(5)
                  .required('Required'),
              },
              {
                type: c.a.textField,
                name: 'mobileNumber',
                label: 'Mobile Number',
                value: e.mobileNumber,
                validation: l
                  .string()
                  .min(
                    10,
                    'Please enter a 10-digit Australian mobile number with no spaces'
                  )
                  .max(
                    10,
                    'Please enter a 10-digit Australian mobile number with no spaces'
                  )
                  .required(
                    'Please enter a 10-digit Australian mobile number with no spaces'
                  ),
              },
            ]
          );
        },
        g = a(5),
        h = a(88),
        f = a(45),
        b = a(382);
      t.default = function(e) {
        var t = e.setShowDialog,
          a = e.user,
          c = Object(h.a)({
            path: ''.concat(g.COLLECTIONS.profiles, '/').concat(a.id),
          }),
          l = Object(r.a)(c, 1)[0].doc,
          u = Object(i.useState)(!0),
          d = Object(r.a)(u, 2),
          m = d[0],
          E = d[1],
          y = function() {
            E(!1),
              setTimeout(function() {
                t(!1);
              }, 400);
          };
        return !l || Object(b.a)(l)
          ? null
          : o.a.createElement(s.a, {
              action: 'update',
              actions: {
                update: function(e) {
                  var t = Object(n.a)({}, e, {
                    firstName: e.firstName.trim(),
                    lastName: e.lastName.trim(),
                    currentDegree: e.currentDegree.trim(),
                  });
                  Object(f.d)(g.COLLECTIONS.profiles, a.id, t),
                    (e.firstName === a.firstName &&
                      e.lastName === a.lastName) ||
                      Object(f.d)(g.COLLECTIONS.users, a.id, {
                        firstName: e.firstName.trim(),
                        lastName: e.lastName.trim(),
                      }),
                    y();
                },
                close: y,
              },
              open: m,
              data: p(l),
              formTitle: 'Account Information',
            });
      };
    },
    499: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(64),
        s = a(16),
        c = a.n(s),
        l = a(7),
        u = a.n(l),
        d = a(191),
        m = a(510),
        p = a(1674),
        g = a(11),
        h = a(192),
        f = a(9),
        b = a(279),
        E = a(117),
        y = a(186),
        v = a.n(y),
        x = a(351),
        j = a.n(x),
        S = a(375),
        N = a(717),
        k = a.n(N),
        O = a(280),
        w = a(1720),
        C = a(718),
        T = a.n(C)()(function(e) {
          var t = e.classes,
            a = e.theme,
            o = e.dataState,
            s = e.dataDispatch,
            l = e.disablePadding,
            u = e.reverse,
            d = e.sort,
            m = e.NoneIcon,
            p = e.noneText,
            h = Object(r.useState)(!0),
            b = Object(n.a)(h, 2),
            E = b[0],
            y = b[1],
            v = Object(r.useState)(!1),
            x = Object(n.a)(v, 2),
            j = x[0],
            S = x[1];
          Object(r.useEffect)(
            function() {
              o.limit === o.cap ||
              (o.limit - o.documents.length > 0 &&
                o.limit - o.documents.length < 10)
                ? (y(!1), S(!1))
                : (y(o.documents.length === o.limit),
                  o.documents.length === o.limit && S(!1));
            },
            [o]
          );
          var N = o.documents;
          return (
            d && (N = d(o.documents)),
            i.a.createElement(
              i.a.Fragment,
              null,
              u &&
                j &&
                i.a.createElement(O.a, {
                  key: 'listLoader',
                  className: t && t.listLoader,
                }),
              i.a.createElement(
                k.a,
                {
                  initialLoad: !1,
                  pageStart: 0,
                  loadMore: function() {
                    E && (y(!1), S(!0), s({ type: 'more' }));
                  },
                  hasMore: E,
                  useWindow: !1,
                  threshold: 100,
                  isReverse: u || !1,
                },
                i.a.createElement(
                  w.a,
                  {
                    disablePadding: l || !1,
                    className: c()(t && t.list, 0 === N.length && t.emptyList),
                  },
                  N.length > 0
                    ? N.map(e.children)
                    : i.a.createElement(
                        g.a,
                        {
                          container: !0,
                          justify: 'center',
                          alignItems: 'center',
                          style: {
                            height: '100%',
                            color: a.palette.text.secondary,
                            textAlign: 'center',
                            cursor: 'default',
                            userSelect: 'none',
                            paddingTop: a.spacing(4),
                          },
                        },
                        i.a.createElement(
                          g.a,
                          { item: !0 },
                          m &&
                            i.a.createElement(m, {
                              style: {
                                fontSize: 48,
                                color: a.palette.text.disabled,
                              },
                            }),
                          i.a.createElement(
                            f.a,
                            { variant: 'subtitle1', color: 'textSecondary' },
                            p || 'No items'
                          )
                        )
                      )
                )
              ),
              !u &&
                j &&
                i.a.createElement(O.a, {
                  key: 'listLoader',
                  className: t && t.listLoader,
                })
            )
          );
        }),
        _ = a(116),
        L = a(5),
        I = a(31),
        A = a.n(I);
      t.default = Object(o.a)(
        u()(
          function(e) {
            return {
              spinner: {
                display: 'block',
                margin: ''.concat(e.spacing(2), 'px auto'),
              },
              paperRoot: {
                borderRadius: e.shape.roundBorderRadius,
                width: 'calc(100% - '.concat(e.spacing(3), 'px)'),
                maxWidth: 360,
                outline: 'none',
                maxHeight: 'calc(100% - '.concat(e.spacing(3), 'px)'),
                overflowY: 'hidden',
                position: 'absolute',
                top: e.spacing(1.5),
                bottom: 'auto',
                right: e.spacing(1.5),
                transformOrigin: '100% 0',
              },
              header: {
                boxSizing: 'content-box',
                height: e.spacing(5),
                padding: ''.concat(e.spacing(2), 'px 0'),
              },
              title: { fontWeight: 500, userSelect: 'none', cursor: 'default' },
              titleIcon: {
                verticalAlign: 'middle',
                marginLeft: e.spacing(2),
                marginRight: e.spacing(2),
                marginBottom: e.spacing(0.5) + 1,
                padding: e.spacing(1),
                borderRadius: '50%',
                backgroundColor: e.palette.divider,
              },
              closeButton: {
                position: 'absolute',
                top: e.spacing(1.5),
                right: e.spacing(0.75),
              },
              headerDivider: {
                margin: '0 '.concat(e.spacing(2), 'px'),
                position: 'relative',
                top: e.spacing(1) + 2,
              },
              listWrapper: {
                overflowY: 'auto',
                '-webkit-overflow-scrolling': 'touch',
                maxHeight: 'calc('
                  .concat(window.innerHeight, 'px - ')
                  .concat(e.spacing(3), 'px - ')
                  .concat(e.spacing(9), 'px)'),
              },
              scrollyRollyList: {
                '&::before': {
                  content: '""',
                  width: e.spacing(0.25) + 1,
                  height: '100%',
                  backgroundColor: e.palette.primary.light,
                  position: 'absolute',
                  left: e.spacing(4.5) - 1,
                  top: e.spacing(4),
                },
              },
              scrollyRollyEmptyList: { height: 0, paddingBottom: 0 },
            };
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.theme,
            o = e.showDialog,
            s = e.setShowDialog,
            l = e.isMobile,
            u = e.history,
            y = e.user;
          A.a.updateLocale('en', L.MOMENT_LOCALES);
          var x = Object(r.useState)(!0),
            N = Object(n.a)(x, 2),
            k = N[0],
            O = N[1],
            w = Object(r.useState)(window.innerHeight),
            C = Object(n.a)(w, 2),
            I = C[0],
            R = C[1],
            P = function() {
              I !== window.innerHeight && R(window.innerHeight);
            };
          Object(r.useEffect)(function() {
            return (
              window.addEventListener('resize', P),
              function() {
                window.removeEventListener('resize', P);
              }
            );
          }, []);
          var B = Object(_.a)({
              path: ''
                .concat(L.COLLECTIONS.users, '/')
                .concat(y.id, '/')
                .concat(L.COLLECTIONS.activityLog),
              sort: { field: 'createdAt', direction: 'desc' },
            }),
            W = Object(n.a)(B, 2),
            D = W[0],
            q = W[1],
            M = function() {
              O(!1),
                setTimeout(function() {
                  s(!1);
                }, 400);
            },
            H = function(e) {
              e && (u.push(e), M());
            };
          if (o)
            return i.a.createElement(
              m.a,
              { open: !!o, onClose: M, disableAutoFocus: !0 },
              i.a.createElement(
                p.a,
                { in: k },
                i.a.createElement(
                  d.a,
                  {
                    elevation: 24,
                    classes: { root: c()(t.paperRoot, l && t.paperRootMobile) },
                  },
                  i.a.createElement(
                    g.a,
                    { container: !0, direction: 'column', wrap: 'nowrap' },
                    i.a.createElement(
                      g.a,
                      { item: !0, className: t.header },
                      i.a.createElement(
                        f.a,
                        { variant: 'h5', className: t.title },
                        i.a.createElement(v.a, { className: t.titleIcon }),
                        'Activity Log'
                      ),
                      i.a.createElement(
                        E.a,
                        {
                          onClick: M,
                          className: t.closeButton,
                          id: 'activitylogclose',
                        },
                        i.a.createElement(j.a, null)
                      ),
                      i.a.createElement(h.a, { className: t.headerDivider })
                    ),
                    i.a.createElement(
                      g.a,
                      { item: !0, xs: !0 },
                      i.a.createElement(
                        'div',
                        {
                          className: t.listWrapper,
                          style: {
                            maxHeight: 'calc('
                              .concat(window.innerHeight, 'px - ')
                              .concat(a.spacing(3), 'px - ')
                              .concat(a.spacing(9), 'px)'),
                          },
                        },
                        D.loading && (!D.documents || D.documents.length <= 0)
                          ? i.a.createElement(b.a, { className: t.spinner })
                          : i.a.createElement(
                              i.a.Fragment,
                              null,
                              i.a.createElement(
                                T,
                                {
                                  dataState: D,
                                  dataDispatch: q,
                                  classes: {
                                    list: t.scrollyRollyList,
                                    emptyList: t.scrollyRollyEmptyList,
                                  },
                                  noneText: ' ',
                                },
                                function(e) {
                                  return i.a.createElement(S.default, {
                                    key: e.id,
                                    data: e,
                                    handleClick: H,
                                  });
                                }
                              ),
                              !D.loading &&
                                i.a.createElement(S.default, {
                                  data: {
                                    type: 'system',
                                    createdAt: y.createdAt,
                                    title: 'Signed up',
                                    body: 'Welcome to 2hats!',
                                  },
                                })
                            )
                      )
                    )
                  )
                )
              )
            );
        })
      );
    },
    500: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(106),
        r = a(12),
        i = a(14),
        o = a(0),
        s = a.n(o),
        c = a(16),
        l = a.n(c),
        u = a(64),
        d = a(278),
        m = a(7),
        p = a.n(m),
        g = a(11),
        h = a(9),
        f = a(122),
        b = a.n(f),
        E = a(180),
        y = a(378),
        v = a(379),
        x = a(158),
        j = a(223),
        S = a(264),
        N = a(25),
        k = a(37),
        O = function(e, t) {
          return e
            ? t.filter(function(t) {
                return t.value === e;
              })[0]
            : null;
        },
        w = [
          { value: 0, label: 'Immediately' },
          { value: 1, label: 'in 1 week' },
          { value: 2, label: 'in 2 weeks' },
          { value: 3, label: 'in 3 weeks' },
          { value: 4, label: 'in 4+ weeks' },
        ],
        C = [
          {
            value: 'unrestricted',
            label: 'Unrestricted (full working rights in Australia)',
          },
          {
            value: 'restricted',
            label: 'Restricted (up to 40 hours per fortnight)',
          },
        ],
        T = function(e, t) {
          e || (e = {});
          var a = new Date().getTime();
          return [
            {
              type: N.a.checkbox,
              name: 'confirmCommitment',
              label: 'I can commit to the work days above',
              value: !!e.confirmCommitment,
              validation: k
                .boolean()
                .test(
                  'if-true',
                  'You must commit to the work days above',
                  function(e) {
                    return !!e;
                  }
                )
                .required('You must commit to the work days above'),
            },
            {
              type: N.a.checkbox,
              name: 'confirmTfn',
              label: 'I have a TFN or ABN',
              value: !!e.confirmTfn,
              validation: k
                .boolean()
                .test('if-true', 'You must have a TFN or ABN', function(e) {
                  return !!e;
                })
                .required('You must have a TFN or ABN'),
            },
            {
              type: N.a.autocomplete,
              name: 'startWeek',
              label: 'When can you start?',
              value: O(e.startWeek, w),
              suggestions: w,
              validation: k
                .object({
                  value: k.number().required('Start date is required'),
                  label: k.string(),
                })
                .required('Start date is required'),
            },
            {
              type: N.a.slider,
              name: 'pay',
              label: 'Your preferred pay',
              units: 'dollarydoos',
              value: e.pay || 100,
              calcValueLabel: function(t) {
                return '$'
                  .concat(((t / 100) * e['pay-calcVal']).toFixed(2), '/')
                  .concat(e['pay-units'], ' (')
                  .concat(t, '%)');
              },
              sliderThumbLabel: '%',
              min: 80,
              max: 120,
              step: 5,
              validation: k
                .number()
                .min(80)
                .max(120)
                .required('Pay is required'),
            },
            {
              type: N.a.textFieldMultiline,
              name: 'coverLetter',
              label: 'Describe why you are a good fit',
              value: e.coverLetter,
              validation: k.string().required('Required'),
            },
            {
              type: N.a.autocomplete,
              name: 'workRestriction',
              label: 'Work restriction',
              value: O(e.workRestriction, C),
              suggestions: C,
              validation: k
                .object({
                  value: k
                    .string()
                    .required('Work restriction info is required'),
                  label: k.string(),
                })
                .required('Work restriction info is required'),
            },
            {
              type: N.a.dropzone,
              name: 'resume',
              label: 'Resume',
              value: e.resume,
              mimeTypes: 'application/pdf',
              path: 'submissions/'.concat(t.id, '/').concat(a, '/'),
              validation: k.object().shape({
                name: k.string().required(),
                url: k
                  .string()
                  .url('Invalid URL')
                  .required(),
              }),
            },
          ];
        },
        _ = a(13),
        L = a(5),
        I = a(88),
        A = a(45);
      t.default = Object(u.a)(
        p()(
          function(e) {
            return Object(i.a)({}, L.STYLES.DETAIL_VIEW(e), {
              skillsWrapper: {
                marginTop: -e.spacing(1) / 2,
                marginLeft: -e.spacing(1) / 2,
              },
              upskill: {
                marginTop: e.spacing(2),
                marginBottom: e.spacing(4),
                padding: e.spacing(2),
                borderRadius: e.shape.borderRadius,
                boxShadow: e.shadowsLight[12],
                userSelect: 'none',
              },
              upskillIcon: {
                marginRight: e.spacing(1),
                marginTop: e.spacing(0.25),
                color: e.palette.primary.main,
              },
              applyWrapper: { textAlign: 'center', marginTop: e.spacing(3) },
              applyBigWrapper: {
                marginTop: e.spacing(4),
                marginBottom: e.spacing(5),
              },
              formHeaderGrid: { marginBottom: e.spacing(1) },
              coverImage: Object(i.a)({}, L.STYLES.DETAIL_VIEW(e).coverImage, {
                maxWidth: 160,
              }),
            });
          },
          { withTheme: !0 }
        )(function(e) {
          var t = e.classes,
            a = e.theme,
            c = e.data,
            u = e.user,
            m = e.history,
            p = Object(o.useState)(!1),
            f = Object(r.a)(p, 2),
            N = f[0],
            k = f[1],
            O = Object(o.useState)(!1),
            w = Object(r.a)(O, 2),
            C = w[0],
            R = w[1],
            P = Object(I.a)(),
            B = Object(r.a)(P, 2),
            W = B[0],
            D = B[1],
            q = W.doc,
            M = Object(d.a)(a.breakpoints.down('xs')),
            H = function() {
              k(!0),
                W.path ||
                  (D({
                    path: ''.concat(L.COLLECTIONS.profiles, '/').concat(u.id),
                  }),
                  R(!0));
            };
          Object(o.useEffect)(
            function() {
              q && R(!1);
            },
            [q]
          ),
            Object(o.useEffect)(
              function() {
                R(!1);
              },
              [c]
            );
          var F = u.skills
            ? []
            : c.skillsRequired.map(function(e) {
                return e.id;
              });
          return (
            c.skillsRequired
              .map(function(e) {
                return e.id;
              })
              .forEach(function(e) {
                u.skills && !u.skills.includes(e) && F.push(e);
              }),
            s.a.createElement(
              'div',
              { className: t.root },
              s.a.createElement(E.default, { className: t.backButton }),
              s.a.createElement(
                'main',
                { className: t.content },
                c.image && c.image.url
                  ? s.a.createElement('div', {
                      style: {
                        backgroundImage: 'url('.concat(c.image.url, ')'),
                      },
                      className: t.coverImage,
                    })
                  : s.a.createElement('div', { style: { height: 24 } }),
                s.a.createElement(
                  h.a,
                  {
                    variant: M ? 'h5' : 'h4',
                    className: t.title,
                    style: M ? { fontWeight: 500 } : {},
                  },
                  c.title
                ),
                s.a.createElement(y.default, { data: c, isXs: M }),
                s.a.createElement(
                  'div',
                  { className: t.applyWrapper },
                  s.a.createElement(v.default, {
                    onClick: H,
                    data: c,
                    skillsNotAchieved: F,
                    loading: C,
                  })
                ),
                s.a.createElement(
                  'div',
                  { className: t.section },
                  F.length > 0 &&
                    s.a.createElement(
                      g.a,
                      {
                        container: !0,
                        className: t.upskill,
                        wrap: 'nowrap',
                        alignItems: 'flex-start',
                      },
                      s.a.createElement(
                        g.a,
                        { item: !0 },
                        s.a.createElement(b.a, { className: t.upskillIcon })
                      ),
                      s.a.createElement(
                        g.a,
                        { item: !0, xs: !0 },
                        s.a.createElement(
                          h.a,
                          { variant: 'subtitle1', color: 'primary' },
                          'You need ',
                          F.length,
                          ' more of the skills below to apply.'
                        ),
                        s.a.createElement(
                          h.a,
                          { variant: 'body1' },
                          'To demonstrate your skills to potential employers, complete the short online tasks listed below. Click on a skill below to get started.'
                        )
                      )
                    ),
                  s.a.createElement(
                    h.a,
                    { variant: 'h6', gutterBottom: !0 },
                    'Skills required',
                    s.a.createElement(S.default, {
                      skillsNotAchieved: F,
                      skillsRequired: c.skillsRequired,
                    })
                  ),
                  s.a.createElement(
                    'div',
                    { className: t.skillsWrapper },
                    c.skillsRequired.map(function(e, t) {
                      return s.a.createElement(x.a, {
                        key: ''.concat(t, '-').concat(e),
                        value: e,
                        clickable: !0,
                      });
                    })
                  )
                ),
                s.a.createElement(
                  'div',
                  { className: t.section },
                  s.a.createElement(
                    h.a,
                    { variant: 'h6', gutterBottom: !0 },
                    'About the company'
                  ),
                  s.a.createElement('div', {
                    className: t.renderedHtml,
                    dangerouslySetInnerHTML: { __html: c.companyDescription },
                  })
                ),
                s.a.createElement(
                  'div',
                  { className: t.section },
                  s.a.createElement(
                    h.a,
                    { variant: 'h6', gutterBottom: !0 },
                    'Job description'
                  ),
                  s.a.createElement('div', {
                    className: t.renderedHtml,
                    dangerouslySetInnerHTML: { __html: c.jobDescription },
                  })
                ),
                s.a.createElement(
                  'div',
                  { className: l()(t.section, t.applyBigWrapper) },
                  s.a.createElement(v.default, {
                    onClick: H,
                    data: c,
                    skillsNotAchieved: F,
                    loading: C,
                    big: !0,
                  })
                )
              ),
              s.a.createElement(j.a, {
                action: 'apply',
                actions: {
                  apply: function(e) {
                    (function(e) {
                      if (!c.jobId) {
                        var t = c.id,
                          a = Object(n.a)(c, ['id']);
                        R(!0),
                          Object(A.a)(
                            ''
                              .concat(L.COLLECTIONS.users, '/')
                              .concat(u.id, '/')
                              .concat(L.COLLECTIONS.jobs),
                            Object(i.a)({}, a, {
                              UID: u.id,
                              outcome: 'pending',
                              screened: !1,
                              submissionContent: Object(i.a)({}, e),
                              jobId: t,
                              submitted: !0,
                            })
                          ).then(function(e) {
                            console.log('Created job application doc', e.id);
                            var t = u.touchedJobs || [];
                            t.push(c.id),
                              Object(A.d)(L.COLLECTIONS.users, u.id, {
                                touchedJobs: t,
                              }),
                              m.push(
                                ''
                                  .concat(_.h, '?id=')
                                  .concat(e.id, '&yours=true')
                              );
                          });
                      }
                    })(e),
                      Object(A.d)(L.COLLECTIONS.profiles, u.id, {
                        resume: e.resume,
                      }),
                      k(!1);
                  },
                  close: function() {
                    k(!1);
                  },
                },
                open: !(!N || !q),
                data: T(
                  {
                    'pay-calcVal': c.payRate,
                    'pay-units': c.payUnits,
                    resume: q && q.resume,
                    workRestriction: q && q.workRestriction,
                  },
                  u
                ),
                formTitle: 'for '.concat(c.title),
                formHeader: s.a.createElement(
                  'div',
                  { style: { marginBottom: 32 } },
                  s.a.createElement(y.default, { data: c, isXs: M })
                ),
              })
            )
          );
        })
      );
    },
    505: function(e, t, a) {
      e.exports = a.p + 'static/media/congratsMan.7eb17513.svg';
    },
    58: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(64),
        s = a(16),
        c = a.n(s),
        l = a(224),
        u = a(33),
        d = a(13),
        m = function(e) {
          return function(t) {
            return Object(o.a)(function(a) {
              return (
                Object(r.useEffect)(function() {
                  var t = a.location,
                    n = a.history;
                  u.a.onAuthStateChanged(function(a) {
                    if (!e(a)) {
                      if (t.pathname)
                        return void n.push(
                          ''
                            .concat(d.o, '?route=')
                            .concat(encodeURIComponent(t.pathname + t.search))
                        );
                      n.push(d.o);
                    }
                  });
                }, []),
                a.authUser ? i.a.createElement(t, a) : null
              );
            });
          };
        },
        p = a(7),
        g = a.n(p),
        h = a(11),
        f = a(1728),
        b = a(1720),
        E = a(192),
        y = a(117),
        v = a(1729),
        x = a(1724),
        j = a(711),
        S = a.n(j),
        N = a(360),
        k = a.n(N),
        O = a(218),
        w = a.n(O),
        C = a(63),
        T = a.n(C),
        _ = a(71),
        L = a.n(_),
        I = a(70),
        A = a.n(I),
        R = a(708),
        P = a.n(R),
        B = a(709),
        W = a.n(B),
        D = a(710),
        q = a.n(D),
        M = a(278),
        H = a(346),
        F = a(345),
        U = a.n(F),
        z = a(216),
        G = a.n(z),
        $ = a(260),
        Y = a(474),
        V = a(369),
        X = a(77),
        K = a(497),
        J = a(475),
        Z = a(88),
        Q = a(5),
        ee = a(59);
      a.d(t, 'DRAWER_WIDTH', function() {
        return te;
      }),
        a.d(t, 'default', function() {
          return ne;
        });
      var te = 240,
        ae = function(e) {
          return {
            root: { width: '100%', minHeight: '100%', overflowX: 'hidden' },
            desktopNavWrapper: {
              width: te,
              height: '100%',
              overflowY: 'auto',
              '@media print': { display: 'none' },
            },
            mobileNavWrapper: {
              width: 0,
              overflowY: 'auto',
              '@media print': { display: 'none' },
            },
            drawerPaper: {
              width: te,
              borderRight: 'none',
              '$desktopNavWrapper &': { zIndex: 1 },
              '@media print': { display: 'none' },
            },
            nav: { height: '100%' },
            logoWrapper: {
              padding: e.spacing(2),
              paddingBottom: e.spacing(1),
              justifyContent: 'flex-start',
              minHeight: 64,
              cursor: 'pointer',
            },
            logo: { width: 100, userSelect: 'none', userDrag: 'none' },
            activityLogButton: {
              position: 'absolute',
              right: e.spacing(1),
              top: e.spacing(0.75),
              color: e.palette.primary,
              '& svg': { fontSize: e.spacing(4) },
            },
            badge: { boxShadow: '0 0 0 2px #fff' },
            userWrapper: {
              padding: e.spacing(2),
              paddingBottom: e.spacing(0.5),
              marginBottom: e.spacing(1),
              cursor: 'default',
            },
            divider: {
              margin: ''
                .concat(e.spacing(1), 'px ')
                .concat(e.spacing(2.25), 'px'),
            },
            listWrapper: { marginTop: e.spacing(3) },
            listItemRoot: {
              transition: e.transitions.create(['background-color', 'color']),
              borderRadius: '0 20px 20px 0',
              paddingTop: e.spacing(1),
              paddingBottom: e.spacing(1),
              margin: ''.concat(e.spacing(0.5), 'px 0'),
              marginRight: e.spacing(1),
              width: 'auto',
            },
            listItemIconRoot: { minWidth: e.spacing(5) },
            listItemTextRoot: { margin: 0 },
            selected: {
              color: e.palette.primary.main,
              backgroundColor: e.palette.primary.light,
              '&:hover': { backgroundColor: e.palette.primary.light },
              '& *': { color: e.palette.primary.main },
            },
            wrappedComponentWrapper: {
              transition: e.transitions.create('opacity'),
              zIndex: 2,
              minHeight: '100vh',
            },
            fadeOut: { opacity: 0 },
            wrappedComponentMobilePadding: { paddingBottom: e.spacing(10) },
            appBar: {
              top: 'auto !important',
              bottom: 0,
              backgroundColor: e.palette.background.paper,
              color: e.palette.text.secondary,
              boxShadow: '0 -1px 0 rgba(0,0,0,.05), '.concat(e.shadows[16]),
              '@media print': { display: 'none' },
            },
            toolbar: {
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 '.concat(e.spacing(1), 'px'),
            },
            bottomLogo: {
              height: 28,
              opacity: 0.5,
              userSelect: 'none',
              userDrag: 'none',
              cursor: 'pointer',
            },
            avatarButton: { padding: 0, width: 48, height: 48 },
            avatar: { width: 32, height: 32 },
          };
        };
      function ne(e) {
        return Object(o.a)(
          m(function(e) {
            return !!e;
          })(
            g()(ae, { withTheme: !0 })(function(t) {
              var a = t.classes,
                o = t.theme,
                s = t.history,
                u = t.location,
                m = t.authUser;
              Object(H.a)(o.palette.background.paper);
              var p = Object(M.a)(o.breakpoints.down('sm')),
                g = Object(M.a)('(max-height: 616px)');
              p
                ? document.body.classList.add('fb_up')
                : document.body.classList.remove('fb_up');
              var j = Object(r.useState)(!1),
                N = Object(n.a)(j, 2),
                O = N[0],
                C = N[1],
                _ = Object(r.useState)(!1),
                I = Object(n.a)(_, 2),
                R = I[0],
                B = I[1],
                D = Object(r.useState)(u.pathname),
                F = Object(n.a)(D, 2),
                z = F[0],
                te = F[1],
                ae = Object(r.useState)(!1),
                ne = Object(n.a)(ae, 2),
                re = ne[0],
                ie = ne[1],
                oe = Object(r.useContext)(ee.a),
                se = Object(Z.a)({
                  path: ''.concat(Q.COLLECTIONS.users, '/').concat(m.uid),
                }),
                ce = Object(n.a)(se, 1)[0];
              Object(r.useEffect)(
                function() {
                  ce.doc && !Object(l.a)(ce.doc, oe.user) && oe.setUser(ce.doc);
                },
                [ce.doc]
              );
              var le = oe.user,
                ue = function(e) {
                  C(!1),
                    te(e),
                    (e !== u.pathname || u.search) &&
                      (u.search || B(!0),
                      setTimeout(function() {
                        s.push(e),
                          window.scrollTo({
                            top: 0,
                            left: 0,
                            behavior: 'smooth',
                          });
                      }, 300));
                },
                de = [
                  {
                    label: 'Dashboard',
                    icon: i.a.createElement(k.a, null),
                    route: d.f,
                  },
                  {
                    label: 'Profile',
                    icon: i.a.createElement(w.a, null),
                    route: d.l,
                  },
                  { type: 'divider' },
                  {
                    label: 'Jobs',
                    icon: i.a.createElement(T.a, null),
                    route: d.i,
                  },
                  {
                    label: 'Tasks',
                    icon: i.a.createElement(L.a, null),
                    route: d.b,
                  },
                  {
                    label: 'Courses',
                    icon: i.a.createElement(A.a, null),
                    route: d.c,
                  },
                ],
                me = [
                  {
                    label: 'FAQ',
                    icon: i.a.createElement(P.a, null),
                    type: 'link',
                    href: 'https://www.2hats.com.au/faq-for-students',
                  },
                  { type: 'divider' },
                  {
                    disabled: !le,
                    label: 'Update Account Info',
                    icon: i.a.createElement(W.a, null),
                    onClick: function() {
                      ie(!0);
                    },
                  },
                  {
                    label: 'Log Out',
                    icon: i.a.createElement(q.a, null),
                    route: d.j,
                  },
                ];
              return i.a.createElement(
                i.a.Fragment,
                null,
                i.a.createElement(
                  h.a,
                  { container: !0, className: a.root, wrap: 'nowrap' },
                  i.a.createElement(
                    h.a,
                    {
                      item: !0,
                      className: p ? a.mobileNavWrapper : a.desktopNavWrapper,
                    },
                    i.a.createElement(
                      f.a,
                      {
                        variant: p ? 'temporary' : 'permanent',
                        open: O || !p,
                        onClose: function() {
                          p && C(!1);
                        },
                        classes: { paper: a.drawerPaper },
                      },
                      i.a.createElement(
                        h.a,
                        {
                          container: !0,
                          direction: 'column',
                          component: 'nav',
                          className: a.nav,
                          wrap: 'nowrap',
                        },
                        i.a.createElement(
                          h.a,
                          {
                            item: !0,
                            className: a.logoWrapper,
                            onClick: function() {
                              s.push(d.f);
                            },
                          },
                          i.a.createElement('img', {
                            src: U.a,
                            alt: '2hats',
                            className: a.logo,
                          })
                        ),
                        i.a.createElement(E.a, { className: a.divider }),
                        i.a.createElement(
                          h.a,
                          { item: !0, className: a.userWrapper },
                          i.a.createElement(Y.default, { user: le })
                        ),
                        i.a.createElement(
                          h.a,
                          { item: !0, xs: !0 },
                          i.a.createElement(
                            b.a,
                            { disablePadding: !0 },
                            de.map(function(e, t) {
                              return i.a.createElement(V.default, {
                                data: e,
                                key: t,
                                selected: z === e.route || z + 's' === e.route,
                                goTo: ue,
                                classes: a,
                              });
                            })
                          )
                        ),
                        i.a.createElement(
                          h.a,
                          { item: !0 },
                          i.a.createElement(
                            b.a,
                            { disablePadding: !0 },
                            g &&
                              i.a.createElement(E.a, { className: a.divider }),
                            me.map(function(e, t) {
                              return i.a.createElement(V.default, {
                                data: e,
                                key: t,
                                goTo: ue,
                                classes: a,
                              });
                            })
                          )
                        )
                      )
                    )
                  ),
                  i.a.createElement(
                    h.a,
                    {
                      item: !0,
                      xs: !0,
                      className: c()(
                        a.wrappedComponentWrapper,
                        R && a.fadeOut,
                        p && a.wrappedComponentMobilePadding
                      ),
                    },
                    i.a.createElement(
                      $.default,
                      null,
                      le
                        ? i.a.createElement(
                            e,
                            Object.assign({}, t, {
                              classes: null,
                              isMobile: p,
                              user: le,
                              location: u,
                            })
                          )
                        : i.a.createElement(X.default, { showNav: !0 })
                    )
                  ),
                  p &&
                    i.a.createElement(
                      v.a,
                      {
                        position: 'fixed',
                        color: 'default',
                        className: a.appBar,
                      },
                      i.a.createElement(
                        x.a,
                        { className: a.toolbar },
                        i.a.createElement(
                          y.a,
                          {
                            id: 'mobile-nav-drawer',
                            color: 'primary',
                            'aria-label': 'Open navigation drawer',
                            onClick: function() {
                              C(!0);
                            },
                          },
                          i.a.createElement(S.a, null)
                        ),
                        i.a.createElement('img', {
                          src: G.a,
                          alt: '2hats',
                          className: a.bottomLogo,
                          onClick: function() {
                            s.push(d.f);
                          },
                        }),
                        i.a.createElement(
                          y.a,
                          {
                            color: 'inherit',
                            onClick: function() {
                              C(!0);
                            },
                            className: a.avatarButton,
                          },
                          i.a.createElement(J.default, {
                            data: le || {},
                            className: a.avatar,
                          })
                        )
                      )
                    ),
                  re &&
                    le &&
                    i.a.createElement(K.default, {
                      user: le,
                      setShowDialog: ie,
                    })
                )
              );
            })
          )
        );
      }
    },
    59: function(e, t, a) {
      'use strict';
      var n = a(0),
        r = a.n(n).a.createContext();
      t.a = r;
    },
    639: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(12),
        s = a(0),
        c = a.n(s),
        l = a(64),
        u = a(178),
        d = a(11),
        m = a(9),
        p = a(33),
        g = a(21),
        h = a(13),
        f = a(5),
        b = a(121),
        E = a.n(b);
      t.default = Object(l.a)(function(e) {
        var t = e.history,
          a = Object(s.useState)(''),
          n = Object(o.a)(a, 2),
          l = n[0],
          b = n[1],
          y = Object(s.useState)(!0),
          v = Object(o.a)(y, 2),
          x = v[0],
          j = v[1],
          S = Object(s.useState)(null),
          N = Object(o.a)(S, 2),
          k = N[0],
          O = N[1];
        Object(s.useEffect)(function() {
          var e = t.location.search,
            a = E.a.parse(e);
          console.log(a), w(a.slKey, a.slSecret);
        }, []);
        var w = function(e, a) {
          if (e && '' !== e) {
            var n = { slKey: e, slSecret: a };
            Object(g.b)(
              g.a.SMART_LINK,
              n,
              ((o = Object(i.a)(
                r.a.mark(function a(n) {
                  var i;
                  return r.a.wrap(function(a) {
                    for (;;)
                      switch ((a.prev = a.next)) {
                        case 0:
                          console.log(n),
                            n.data.token
                              ? p.a
                                  .signInWithCustomToken(n.data.token)
                                  .then(function(a) {
                                    var r = n.data.route;
                                    if (r === h.e || r === h.m) {
                                      var i = a.user.displayName.split(' ')[
                                        [0]
                                      ];
                                      t.replace(
                                        r +
                                          '?firstName='
                                            .concat(i, '&smartKey=')
                                            .concat(e)
                                      );
                                    } else
                                      r === h.s
                                        ? (p.b
                                            .collection(f.COLLECTIONS.users)
                                            .doc(a.user.uid)
                                            .update({ emailVerified: !0 }),
                                          t.replace(r))
                                        : t.replace(r);
                                  })
                              : (i = n.data.route) === h.e || i === h.m
                              ? (Object(g.b)(
                                  i === h.e
                                    ? g.a.CREATE_PASSWORD
                                    : g.a.RESET_PASSWORD,
                                  { email: n.data.email.toLowerCase() },
                                  O({
                                    variant: 'success',
                                    message:
                                      'You should receive the email shortly',
                                  }),
                                  function(e) {
                                    O({
                                      variant: 'error',
                                      message:
                                        'An error has occured. Please try again in a moment',
                                    }),
                                      console.log(e);
                                  }
                                ),
                                b(
                                  'This link has expired.\n\n                    Check your email again\u2014we\u2019ve sent you a fresh one!'
                                ),
                                j(!1))
                              : t.replace(
                                  ''
                                    .concat(h.o, '?email=')
                                    .concat(n.data.email, '&route=')
                                    .concat(n.data.route)
                                );
                        case 2:
                        case 'end':
                          return a.stop();
                      }
                  }, a);
                })
              )),
              function(e) {
                return o.apply(this, arguments);
              }),
              function(e) {
                console.log('Call smartLink error: ', e.message),
                  b(e.message),
                  j(!1);
              }
            );
          }
          var o;
        };
        return c.a.createElement(
          d.a,
          {
            container: !0,
            style: { height: '100vh' },
            alignItems: 'center',
            justify: 'center',
          },
          c.a.createElement(
            d.a,
            { item: !0 },
            c.a.createElement(
              u.default,
              { isLoading: x, height: 330, snackBar: k },
              c.a.createElement(
                m.a,
                {
                  variant: 'h6',
                  style: {
                    paddingTop: 50,
                    width: '100%',
                    textAlign: 'center',
                    whiteSpace: 'pre-line',
                  },
                },
                x ? 'Hold on to your hat \ud83e\udd20' : l
              )
            )
          )
        );
      });
    },
    640: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(7),
        o = a.n(i),
        s = a(11),
        c = a(63),
        l = a.n(c),
        u = a(71),
        d = a.n(u),
        m = a(70),
        p = a.n(m),
        g = a(58),
        h = a(138),
        f = a(476),
        b = a(263),
        E = a(40),
        y = a(159),
        v = a(13),
        x = a(5);
      t.default = Object(g.default)(
        o()(function(e) {
          return {
            root: { paddingBottom: e.spacing(4) },
            wrapper: { margin: '0 auto', maxWidth: '100vw' },
          };
        })(function(e) {
          var t = e.classes,
            a = e.isMobile,
            i = e.user,
            o = Object(y.a)(),
            c = Object(E.getNumCards)(o.width, a);
          Object(n.useEffect)(function() {
            document.title = '2hats \u2013 Dashboard';
          }, []);
          var u,
            m,
            g = function(e, t) {
              switch (e) {
                case 'courses':
                  return {
                    title: 'Courses',
                    mapping: 'course',
                    cols: t > 1 ? (c > 1 ? Math.min(t, c) : 2) : 1,
                    useCollectionInit: {
                      path: x.COLLECTIONS.courses,
                      limit: t,
                      sort: { field: 'ranking', direction: 'asc' },
                      filters: [
                        { field: 'published', operator: '==', value: !0 },
                      ],
                    },
                    filterIds: i.touchedCourses,
                    Icon: p.a,
                    route: v.c,
                    noneLeftMsg:
                      'There are no more courses available at the moment',
                  };
                case 'assessments':
                  return {
                    title: 'Tasks',
                    mapping: 'assessment',
                    cols: t > 1 ? (c > 1 ? Math.min(t, c) : 2) : 1,
                    useCollectionInit: {
                      path: x.COLLECTIONS.assessments,
                      limit: t,
                      sort: { field: 'createdAt', direction: 'desc' },
                      filters: [
                        { field: 'published', operator: '==', value: !0 },
                      ],
                    },
                    filterIds: i.touchedAssessments,
                    Icon: d.a,
                    route: v.b,
                    noneLeftMsg:
                      'There are no more tasks available at the moment',
                  };
                case 'jobs':
                default:
                  return {
                    title: 'Jobs',
                    mapping: 'job',
                    cols: t > 1 ? (c > 1 ? Math.min(t, c) : 2) : 1,
                    useCollectionInit: {
                      path: x.COLLECTIONS.jobs,
                      limit: t,
                      sort: { field: 'createdAt', direction: 'desc' },
                      filters: [
                        { field: 'published', operator: '==', value: !0 },
                      ],
                    },
                    filterIds: i.touchedJobs,
                    Icon: l.a,
                    route: v.i,
                    noneLeftMsg:
                      'There are no more jobs available at the moment',
                  };
              }
            };
          switch (i.interest) {
            case 'courses':
              (u = g(i.interest, 3)), (m = [g('assessments', 2), g('jobs', 1)]);
              break;
            case 'assessments':
              (u = g(i.interest, 3)),
                (m = [g('courses', 2 === c ? 1 : 2), g('jobs', 1)]);
              break;
            case 'jobs':
            default:
              (u = g('jobs', 3)), (m = [g('assessments', 2), g('courses', 1)]);
          }
          return r.a.createElement(
            'div',
            { className: t.root },
            r.a.createElement(h.default, {
              isMobile: a,
              title: 'Hi, '.concat(i.firstName.trim(), '!'),
              maxWidth: Object(E.getCardsWidth)(c),
            }),
            r.a.createElement(b.default, { width: Object(E.getCardsWidth)(c) }),
            r.a.createElement(f.default, {
              user: i,
              width: Object(E.getCardsWidth)(c),
            }),
            r.a.createElement(
              'div',
              {
                style: { width: Object(E.getCardsWidth)(c) },
                className: t.wrapper,
              },
              r.a.createElement(
                E.default,
                Object.assign({}, u, { hideMore: !0, extra: !0 })
              )
            ),
            r.a.createElement(
              s.a,
              {
                container: !0,
                className: t.wrapper,
                style: { width: Object(E.getCardsWidth)(c) },
                direction: c < 2 ? 'column' : 'row',
                wrap: 'nowrap',
              },
              r.a.createElement(
                E.default,
                Object.assign({}, m[0], { hideMore: !0 })
              ),
              r.a.createElement(
                E.default,
                Object.assign({}, m[1], { hideMore: !0 })
              )
            )
          );
        })
      );
    },
    641: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(58),
        o = a(138),
        s = a(70),
        c = a.n(s),
        l = a(221),
        u = a.n(l),
        d = a(159),
        m = a(40),
        p = a(5);
      t.default = Object(i.default)(function(e) {
        var t = e.isMobile,
          a = e.user,
          i = Object(d.a)(),
          s = Object(m.getNumCards)(i.width, t);
        return (
          Object(n.useEffect)(function() {
            document.title = '2hats \u2013 Courses';
          }, []),
          r.a.createElement(
            'div',
            null,
            r.a.createElement(o.default, {
              title: 'Courses',
              isMobile: t,
              maxWidth: Object(m.getCardsWidth)(s),
              icon: r.a.createElement(c.a, null),
            }),
            r.a.createElement(m.default, {
              title: 'Your Courses',
              mapping: 'course',
              cols: s,
              useCollectionInit: {
                path: ''
                  .concat(p.COLLECTIONS.users, '/')
                  .concat(a.id, '/')
                  .concat(p.COLLECTIONS.courses),
                limit: s,
                sort: { field: 'ranking', direction: 'asc' },
              },
              extra: !0,
              Icon: u.a,
            }),
            r.a.createElement(m.default, {
              title: 'Marketing Courses',
              mapping: 'course',
              cols: s,
              useCollectionInit: {
                path: p.COLLECTIONS.courses,
                limit: s + 1,
                filters: [
                  { field: 'category', operator: '==', value: 'marketing' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'ranking', direction: 'asc' },
              },
              filterIds: a.touchedCourses,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no more marketing courses available at the moment',
              extra: !0,
            }),
            r.a.createElement(m.default, {
              title: 'Sales Courses',
              mapping: 'course',
              cols: s,
              useCollectionInit: {
                path: p.COLLECTIONS.courses,
                limit: s + 1,
                filters: [
                  { field: 'category', operator: '==', value: 'sales' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'ranking', direction: 'asc' },
              },
              filterIds: a.touchedCourses,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no more sales courses available at the moment',
              extra: !0,
            })
          )
        );
      });
    },
    642: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(121),
        s = a.n(o),
        c = a(7),
        l = a.n(c),
        u = a(11),
        d = a(9),
        m = a(107),
        p = a.n(m),
        g = a(21),
        h = a(45),
        f = a(5),
        b = a(58),
        E = a(59),
        y = a(77),
        v = a(180);
      t.default = Object(b.default)(
        l()(function(e) {
          return {
            root: {
              background: e.palette.background.paper,
              height: '100vh',
              textAlign: 'center',
            },
            message: { marginTop: e.spacing(1) },
            errorIcon: { fontSize: 64, color: e.palette.text.secondary },
            backButton: {
              position: 'relative !important',
              marginTop: e.spacing(3),
            },
          };
        })(function(e) {
          var t = e.classes,
            a = e.location,
            o = Object(r.useState)(!1),
            c = Object(n.a)(o, 2),
            l = c[0],
            m = c[1],
            b = s.a.parse(a.search),
            x = b.id && b.id.length > 0,
            j = Object(r.useContext)(E.a).user;
          return (
            Object(r.useEffect)(function() {
              document.title =
                '2hats \u2013 Courses \u2013\xa0Redirecting\u2026';
            }, []),
            Object(r.useEffect)(
              function() {
                if (x && j) {
                  var e = b.id;
                  if (!j.touchedCourses || !j.touchedCourses.includes(e)) {
                    var t = j.touchedCourses || [];
                    t.push(e),
                      Object(h.d)(f.COLLECTIONS.users, j.id, {
                        touchedCourses: t,
                      });
                  }
                  'course' !== j.interest &&
                    Object(h.d)(f.COLLECTIONS.users, j.id, {
                      interest: 'course',
                    }),
                    Object(g.b)(
                      g.a.LW_SINGLE_SIGN_ON,
                      { courseId: b.id },
                      function(e) {
                        window.location.replace(e.data.url);
                      },
                      function(e) {
                        console.error(e), m(!0);
                      }
                    );
                }
              },
              [j]
            ),
            j
              ? x && !l
                ? i.a.createElement(y.default, {
                    contained: !0,
                    message:
                      'Redirecting you to the 2hats Education Portal\u2026',
                  })
                : i.a.createElement(
                    u.a,
                    {
                      container: !0,
                      justify: 'center',
                      alignItems: 'center',
                      className: t.root,
                    },
                    i.a.createElement(
                      u.a,
                      { item: !0 },
                      i.a.createElement(p.a, { className: t.errorIcon }),
                      i.a.createElement(
                        d.a,
                        { variant: 'h6', className: t.message },
                        'This link is invalid'
                      ),
                      i.a.createElement(v.default, { className: t.backButton })
                    )
                  )
              : i.a.createElement(y.default, {
                  contained: !0,
                  message: 'Loading\u2026',
                })
          );
        })
      );
    },
    643: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(58),
        o = a(138),
        s = a(71),
        c = a.n(s),
        l = a(221),
        u = a.n(l),
        d = a(159),
        m = a(40),
        p = a(5);
      t.default = Object(i.default)(function(e) {
        var t = e.isMobile,
          a = e.user,
          i = Object(d.a)(),
          s = Object(m.getNumCards)(i.width, t);
        return (
          Object(n.useEffect)(function() {
            document.title = '2hats \u2013 Assessments';
          }, []),
          r.a.createElement(
            'div',
            null,
            r.a.createElement(o.default, {
              title: 'Tasks',
              isMobile: t,
              maxWidth: Object(m.getCardsWidth)(s),
              icon: r.a.createElement(c.a, null),
            }),
            r.a.createElement(m.default, {
              title: 'Your Submissions',
              mapping: 'assessment',
              cols: s,
              useCollectionInit: {
                path: ''
                  .concat(p.COLLECTIONS.users, '/')
                  .concat(a.id, '/')
                  .concat(p.COLLECTIONS.assessments),
                limit: s,
                sort: { field: 'updatedAt', direction: 'desc' },
              },
              extra: !0,
              Icon: u.a,
            }),
            r.a.createElement(m.default, {
              title: 'Marketing Tasks',
              mapping: 'assessment',
              cols: s,
              useCollectionInit: {
                path: p.COLLECTIONS.assessments,
                limit: s,
                filters: [
                  { field: 'category', operator: '==', value: 'marketing' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedAssessments,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no more marketing tasks available at the moment',
              extra: !0,
            }),
            r.a.createElement(m.default, {
              title: 'Sales Tasks',
              mapping: 'assessment',
              cols: s,
              useCollectionInit: {
                path: p.COLLECTIONS.assessments,
                limit: s,
                filters: [
                  { field: 'category', operator: '==', value: 'sales' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedAssessments,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no more sales tasks available at the moment',
              extra: !0,
            }),
            r.a.createElement(m.default, {
              title: 'Tech Tasks',
              mapping: 'assessment',
              cols: s,
              useCollectionInit: {
                path: p.COLLECTIONS.assessments,
                limit: s,
                filters: [
                  { field: 'category', operator: '==', value: 'tech' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedAssessments,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no more tech tasks available at the moment',
              extra: !0,
            })
          )
        );
      });
    },
    649: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(58),
        o = a(138),
        s = a(63),
        c = a.n(s),
        l = a(221),
        u = a.n(l),
        d = a(159),
        m = a(40),
        p = a(263),
        g = a(5);
      t.default = Object(i.default)(function(e) {
        var t = e.isMobile,
          a = e.user,
          i = Object(d.a)(),
          s = Object(m.getNumCards)(i.width, t);
        return (
          Object(n.useEffect)(function() {
            document.title = '2hats \u2013 Jobs';
          }, []),
          r.a.createElement(
            'div',
            null,
            r.a.createElement(o.default, {
              title: 'Jobs',
              isMobile: t,
              maxWidth: Object(m.getCardsWidth)(s),
              icon: r.a.createElement(c.a, null),
            }),
            r.a.createElement(p.default, { width: Object(m.getCardsWidth)(s) }),
            r.a.createElement(m.default, {
              title: 'Your Jobs',
              mapping: 'job',
              cols: s,
              useCollectionInit: {
                path: ''
                  .concat(g.COLLECTIONS.users, '/')
                  .concat(a.id, '/')
                  .concat(g.COLLECTIONS.jobs),
                limit: s + 1,
                sort: { field: 'updatedAt', direction: 'desc' },
              },
              extra: !0,
              Icon: u.a,
            }),
            r.a.createElement(m.default, {
              title: 'Marketing Jobs',
              mapping: 'job',
              cols: s,
              useCollectionInit: {
                path: g.COLLECTIONS.jobs,
                limit: s + 1,
                filters: [
                  { field: 'industry', operator: '==', value: 'marketing' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedJobs,
              NoneLeftIcon: c.a,
              noneLeftMsg:
                'There are no marketing jobs available at the moment',
              extra: !0,
            }),
            r.a.createElement(m.default, {
              title: 'Sales Jobs',
              mapping: 'job',
              cols: s,
              useCollectionInit: {
                path: g.COLLECTIONS.jobs,
                limit: s + 1,
                filters: [
                  { field: 'industry', operator: '==', value: 'sales' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedJobs,
              NoneLeftIcon: c.a,
              noneLeftMsg: 'There are no sales jobs available at the moment',
              extra: !0,
            }),
            r.a.createElement(m.default, {
              title: 'Tech Jobs',
              mapping: 'job',
              cols: s,
              useCollectionInit: {
                path: g.COLLECTIONS.jobs,
                limit: s + 1,
                filters: [
                  { field: 'industry', operator: '==', value: 'tech' },
                  { field: 'published', operator: '==', value: !0 },
                ],
                sort: { field: 'createdAt', direction: 'desc' },
              },
              filterIds: a.touchedJobs,
              NoneLeftIcon: c.a,
              noneLeftMsg: 'There are no tech jobs available at the moment',
              extra: !0,
            })
          )
        );
      });
    },
    650: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(14),
        i = a(0),
        o = a.n(i),
        s = a(31),
        c = a.n(s),
        l = a(7),
        u = a.n(l),
        d = a(9),
        m = a(280),
        p = a(36),
        g = a(67),
        h = a.n(g),
        f = a(58),
        b = a(493),
        E = a(494),
        y = a(5),
        v = a(21),
        x = a(274);
      t.default = Object(f.default)(
        u()(function(e) {
          return Object(
            r.a
          )({}, y.STYLES.DETAIL_VIEW(e), { root: Object(r.a)({}, y.STYLES.DETAIL_VIEW(e).root, { marginTop: e.spacing(2), marginBottom: e.spacing(5) }), content: { margin: '0 auto', maxWidth: 340 }, title: Object(r.a)({}, y.STYLES.DETAIL_VIEW(e).title, { textAlign: 'left' }) });
        })(function(e) {
          var t = e.classes,
            a = Object(i.useState)(null),
            r = Object(n.a)(a, 2),
            s = r[0],
            l = r[1],
            u = Object(i.useState)(null),
            g = Object(n.a)(u, 2),
            f = g[0],
            y = g[1],
            j = Object(i.useState)(null),
            S = Object(n.a)(j, 2),
            N = S[0],
            k = S[1],
            O = Object(i.useState)(null),
            w = Object(n.a)(O, 2),
            C = w[0],
            T = w[1],
            _ = Object(i.useState)(''),
            L = Object(n.a)(_, 2),
            I = L[0],
            A = L[1];
          return (
            Object(i.useEffect)(function() {
              document.title = '2hats \u2013 Book an Interview';
            }, []),
            Object(i.useEffect)(function() {
              var e = {
                start: c()()
                  .startOf('day')
                  .toISOString(),
                end: c()()
                  .startOf('day')
                  .add(2, 'weeks')
                  .add(3, 'days')
                  .toISOString(),
                duration: 6e5,
              };
              Object(v.b)(
                v.a.CHECK_FREE_TIMESLOTS,
                e,
                function(e) {
                  l(
                    e.data.map(function(e) {
                      return {
                        start: c()(e.start),
                        end: c()(e.end),
                        duration: e.duration / 60 / 1e3,
                      };
                    })
                  ),
                    console.log(
                      e.data.map(function(e) {
                        return {
                          start: c()(e.start).toString(),
                          end: c()(e.end).toString(),
                          duration: e.duration / 60 / 1e3,
                        };
                      })
                    );
                },
                function(e) {
                  console.error(e);
                }
              );
            }, []),
            Object(i.useEffect)(
              function() {
                if (s) {
                  var e = Object(x.b)(),
                    t = [];
                  e.forEach(function(e) {
                    return t.push(Object(x.c)(s, e));
                  }),
                    y(e),
                    k(t);
                }
              },
              [s]
            ),
            Object(i.useEffect)(
              function() {
                A('');
              },
              [C]
            ),
            o.a.createElement(
              'div',
              { className: t.root },
              o.a.createElement(
                'main',
                { className: t.content },
                o.a.createElement(
                  d.a,
                  { variant: 'h4', className: t.title },
                  'Book an Interview'
                ),
                s && f && N
                  ? o.a.createElement(
                      o.a.Fragment,
                      null,
                      o.a.createElement(
                        'div',
                        { className: t.section },
                        o.a.createElement(
                          d.a,
                          { variant: 'h6', gutterBottom: !0 },
                          'Choose a date'
                        ),
                        o.a.createElement(b.default, {
                          selectedDate: C,
                          setSelectedDate: T,
                          dates: f,
                          timeslots: N,
                        })
                      ),
                      C &&
                        o.a.createElement(
                          o.a.Fragment,
                          null,
                          o.a.createElement(
                            'div',
                            { className: t.section },
                            o.a.createElement(
                              d.a,
                              { variant: 'h6', gutterBottom: !0 },
                              'Choose a time range'
                            ),
                            o.a.createElement(E.default, {
                              selectedTime: I,
                              setSelectedTime: A,
                              availableTimes: s,
                              timeslots: N[f.indexOf(C)],
                            })
                          ),
                          o.a.createElement(
                            'div',
                            { className: t.section },
                            o.a.createElement(
                              p.a,
                              {
                                variant: 'contained',
                                color: 'primary',
                                size: 'large',
                                onClick: function() {
                                  var e = C.format('DD-MM-YYYY'),
                                    t = I.split(' \u2013 ')[0],
                                    a = I.split(' \u2013 ')[1],
                                    n = c()(
                                      e + ' ' + t,
                                      'DD-MM-YYYY h:mm a'
                                    ).toISOString(),
                                    r = c()(
                                      e + ' ' + a,
                                      'DD-MM-YYYY h:mm a'
                                    ).toISOString();
                                  console.log(n, r);
                                },
                                disabled: !I,
                              },
                              'Book',
                              o.a.createElement(h.a, null)
                            )
                          )
                        )
                    )
                  : o.a.createElement(
                      'div',
                      { className: t.section },
                      o.a.createElement(m.a, null)
                    )
              )
            )
          );
        })
      );
    },
    651: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(694),
        s = a.n(o),
        c = a(453),
        l = '"Helvetica Neue", Roboto, Helvetica, Arial, sans-serif',
        u = a.n(c)()({
          responsive: {},
          palette: {
            primary: {
              main: '#F15A29',
              dark: '#F15A29',
              contrastText: '#fff',
              darkText: 'hsl(15, 90%, 40%)',
              light: 'hsl(15, 88%, 90%)',
            },
            secondary: {
              light: '#F15A29',
              main: '#F15A29',
              dark: '#F15A29',
              contrastText: '#fff',
            },
            action: { disabled: '#ABABAB' },
          },
          typography: {
            fontFamily: l,
            h4: { fontWeight: 500 },
            h6: { lineHeight: 1.4 },
            subtitle1: { fontWeight: 500 },
            button: { textTransform: 'none', fontWeight: 700 },
          },
          shadowsLight: [
            'none',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 1px 0px rgba(0,0,0,0.07), 0px 2px 1px -1px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 5px 0px rgba(0,0,0,0.1), 0px 2px 2px 0px rgba(0,0,0,0.07), 0px 3px 1px -2px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 1px 8px 0px rgba(0,0,0,0.1), 0px 3px 4px 0px rgba(0,0,0,0.07), 0px 3px 3px -2px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 2px 4px -1px rgba(0,0,0,0.1), 0px 4px 5px 0px rgba(0,0,0,0.07), 0px 1px 10px 0px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 3px 5px -1px rgba(0,0,0,0.1), 0px 5px 8px 0px rgba(0,0,0,0.07), 0px 1px 14px 0px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 3px 5px -1px rgba(0,0,0,0.1), 0px 6px 10px 0px rgba(0,0,0,0.07), 0px 1px 18px 0px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 4px 5px -2px rgba(0,0,0,0.1), 0px 7px 10px 1px rgba(0,0,0,0.07), 0px 2px 16px 1px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 5px 5px -3px rgba(0,0,0,0.1), 0px 8px 10px 1px rgba(0,0,0,0.07), 0px 3px 14px 2px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 5px 6px -3px rgba(0,0,0,0.1), 0px 9px 12px 1px rgba(0,0,0,0.07), 0px 3px 16px 2px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 6px 6px -3px rgba(0,0,0,0.1), 0px 10px 14px 1px rgba(0,0,0,0.07), 0px 4px 18px 3px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 6px 7px -4px rgba(0,0,0,0.1), 0px 11px 15px 1px rgba(0,0,0,0.07), 0px 4px 20px 3px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 8px -4px rgba(0,0,0,0.1), 0px 12px 17px 2px rgba(0,0,0,0.07), 0px 5px 22px 4px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 8px -4px rgba(0,0,0,0.1), 0px 13px 19px 2px rgba(0,0,0,0.07), 0px 5px 24px 4px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 7px 9px -4px rgba(0,0,0,0.1), 0px 14px 21px 2px rgba(0,0,0,0.07), 0px 5px 26px 4px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 9px -5px rgba(0,0,0,0.1), 0px 15px 22px 2px rgba(0,0,0,0.07), 0px 6px 28px 5px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 10px -5px rgba(0,0,0,0.1), 0px 16px 24px 2px rgba(0,0,0,0.07), 0px 6px 30px 5px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 8px 11px -5px rgba(0,0,0,0.1), 0px 17px 26px 2px rgba(0,0,0,0.07), 0px 6px 32px 5px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 9px 11px -5px rgba(0,0,0,0.1), 0px 18px 28px 2px rgba(0,0,0,0.07), 0px 7px 34px 6px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 9px 12px -6px rgba(0,0,0,0.1), 0px 19px 29px 2px rgba(0,0,0,0.07), 0px 7px 36px 6px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 13px -6px rgba(0,0,0,0.1), 0px 20px 31px 3px rgba(0,0,0,0.07), 0px 8px 38px 7px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 13px -6px rgba(0,0,0,0.1), 0px 21px 33px 3px rgba(0,0,0,0.07), 0px 8px 40px 7px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 10px 14px -6px rgba(0,0,0,0.1), 0px 22px 35px 3px rgba(0,0,0,0.07), 0px 8px 42px 7px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 11px 14px -7px rgba(0,0,0,0.1), 0px 23px 36px 3px rgba(0,0,0,0.07), 0px 9px 44px 8px rgba(0,0,0,0.06)',
            '0 0 0 1px rgba(0, 0, 0, .025), 0px 11px 15px -7px rgba(0,0,0,0.1), 0px 24px 38px 3px rgba(0,0,0,0.07), 0px 9px 46px 8px rgba(0,0,0,0.06)',
          ],
          shape: { borderRadius: 20 },
          overrides: {
            MuiStepIcon: { root: { color: '#EDEDED' } },
            MuiButton: {
              contained: { boxShadow: 'none' },
              label: { '& svg': { marginLeft: 8, marginRight: -4 } },
              sizeLarge: { borderRadius: 24 },
            },
            MuiToggleButtonGroup: { root: { boxShadow: 'none !important' } },
            MuiToggleButton: {
              root: {
                borderRadius: ''.concat(20, 'px !important'),
                flex: 1,
                transition: 'background-color .2s, color .2s',
              },
              label: {
                color: 'rgba(0,0,0,.87)',
                position: 'relative',
                zIndex: 99,
              },
              '&$selected': {
                color: '#F15A29',
                '& > span': { color: '#F15A29' },
                '&::after': {
                  backgroundColor: 'hsl(15, 88%, 90%)',
                  opacity: 0.8,
                },
              },
            },
            MuiFab: {
              primary: { color: '#fff' },
              extended: { '& svg': { marginRight: 8 } },
            },
            MuiTooltip: {
              tooltip: { backgroundColor: 'rgba(0,0,0,.75)', fontSize: 12 },
              popper: { opacity: 1 },
            },
            MuiTab: {
              root: {
                minWidth: '64px !important',
                fontSize: '.875rem !important',
              },
              textColorPrimary: {
                color: 'rgba(0,0,0,.87)',
                '& svg': { opacity: 0.87 },
              },
            },
            MuiChip: {
              root: {
                height: 'auto',
                minHeight: 32,
                '&:not(:last-of-type)': { marginRight: 8 },
              },
              label: { whiteSpace: 'normal' },
            },
            MuiAvatar: {
              colorDefault: {
                backgroundColor: 'hsl(15, 88%, 90%)',
                color: '#F15A29',
                fontWeight: 500,
              },
              img: { backgroundColor: 'hsl(15, 88%, 90%)' },
            },
            MuiFilledInput: {
              root: { borderRadius: ''.concat(15, 'px !important') },
              underline: {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            },
            MuiBadge: { badge: { fontWeight: 700 } },
            MuiInputAdornment: { positionStart: { marginBottom: 2 } },
            MuiLink: { root: { fontFamily: l }, button: { fontFamily: l } },
            MuiCardActionArea: { focusHighlight: { opacity: '0 !important' } },
            MuiDialog: {
              paperFullScreen: {
                marginTop: 16,
                borderRadius: ''.concat(20, 'px ').concat(20, 'px 0 0'),
                height: 'calc(100% - 16px)',
              },
            },
          },
        }),
        d = a(383),
        m = a(33),
        p = a(77),
        g = a(59),
        h = a(1730),
        f = a(1733),
        b = a(1722),
        E = a(13),
        y = a(41),
        v = a(457),
        x = a(470),
        j = a(260),
        S = a(471),
        N = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 653));
        }),
        k = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 334));
        }),
        O = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 652));
        }),
        w = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 639));
        }),
        C = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 640));
        }),
        T = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 155));
        }),
        _ = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 649));
        }),
        L = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 643));
        }),
        I = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 641));
        }),
        A = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 642));
        }),
        R = Object(r.lazy)(function() {
          return Promise.resolve().then(a.bind(null, 650));
        });
      t.default = (function(e) {
        return function(t) {
          var a = Object(r.useState)(!0),
            o = Object(n.a)(a, 2),
            s = o[0],
            c = o[1],
            l = Object(r.useState)(null),
            u = Object(n.a)(l, 2),
            d = u[0],
            g = u[1];
          Object(r.useEffect)(function() {
            m.a.onAuthStateChanged(function(e) {
              g(e), s && c(!1), e && h(e);
            });
          }, []);
          var h = function(e) {
            window.smartlook('identify', e.uid, {
              name: e.displayName,
              email: e.email,
            });
          };
          return s
            ? i.a.createElement(p.default, null)
            : i.a.createElement(e, { authUser: d });
        };
      })(function(e) {
        var t = Object(r.useState)(null),
          a = Object(n.a)(t, 2),
          o = a[0],
          c = a[1];
        return i.a.createElement(
          s.a,
          { theme: u },
          i.a.createElement(
            g.a.Provider,
            {
              value: {
                user: o,
                setUser: function(e) {
                  return c(e);
                },
              },
            },
            i.a.createElement(
              h.a,
              null,
              i.a.createElement(
                j.default,
                null,
                i.a.createElement(
                  'div',
                  { className: 'app' },
                  i.a.createElement(x.default, null),
                  i.a.createElement(
                    r.Suspense,
                    { fallback: i.a.createElement(p.default, null) },
                    i.a.createElement(
                      f.a,
                      null,
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: [E.p, E.o],
                        component: function() {
                          return i.a.createElement(k, { isPublic: !0 });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.j,
                        component: function() {
                          return i.a.createElement(k, {
                            isPublic: !0,
                            view: y.a.logout,
                          });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.k,
                        component: function() {
                          return i.a.createElement(k, {
                            isPublic: !0,
                            view: y.a.noPassword,
                          });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.e,
                        component: function() {
                          return i.a.createElement(k, {
                            isPublic: !0,
                            view: y.a.createPassword,
                          });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.m,
                        component: function() {
                          return i.a.createElement(k, {
                            isPublic: !0,
                            view: y.a.resetPassword,
                          });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.s,
                        component: function() {
                          return i.a.createElement(k, {
                            isPublic: !0,
                            view: y.a.validateEmail,
                          });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.r,
                        component: function() {
                          return i.a.createElement(O, { isPublic: !0 });
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: [E.q, E.q.toLowerCase()],
                        component: function() {
                          return i.a.createElement(w, null);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.f,
                        component: function() {
                          return i.a.createElement(C, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.l,
                        component: function() {
                          return i.a.createElement(T, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.i,
                        component: function() {
                          return i.a.createElement(_, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.b,
                        component: function() {
                          return i.a.createElement(L, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: [E.a, E.h],
                        component: function() {
                          return i.a.createElement(N, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.c,
                        component: function() {
                          return i.a.createElement(I, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.d,
                        component: function() {
                          return i.a.createElement(A, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: E.n,
                        component: function() {
                          return i.a.createElement(R, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: '/linkedin',
                        component: d.b,
                      }),
                      i.a.createElement(b.a, {
                        exact: !0,
                        path: '/',
                        component: function() {
                          return i.a.createElement(v.default, e);
                        },
                      }),
                      i.a.createElement(b.a, {
                        component: function() {
                          return i.a.createElement(S.default, null);
                        },
                      })
                    )
                  )
                )
              )
            )
          )
        );
      });
    },
    652: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(42),
        r = a.n(n),
        i = a(69),
        o = a(50),
        s = a(51),
        c = a(54),
        l = a(52),
        u = a(30),
        d = a(53),
        m = a(0),
        p = a.n(m),
        g = a(178),
        h = a(16),
        f = a.n(h),
        b = a(7),
        E = a.n(b),
        y = a(11),
        v = a(9),
        x = a(259),
        j = a(36),
        S = a(279),
        N = a(223),
        k = a(25),
        O = a(37),
        w = a(101),
        C = function(e) {
          return (
            e || (e = {}),
            [
              {
                type: k.a.textField,
                name: 'firstName',
                label: 'First Name',
                value: '',
                validation: O.string().required('Required'),
                width: 6,
                autoFocus: !0,
              },
              {
                type: k.a.textField,
                name: 'lastName',
                label: 'Last Name',
                value: '',
                validation: O.string().required('Required'),
                width: 6,
              },
              {
                type: k.a.textFieldEmail,
                name: 'email',
                label: 'Email',
                value: '',
                disallowSpace: !0,
                validation: O.string()
                  .email('Invalid email')
                  .required('Required'),
              },
              {
                type: k.a.autocompleteFreeText,
                name: 'currentUniversity',
                label: 'Current University',
                value: e.currentUniversity,
                suggestions: w.a.map(function(e) {
                  return { label: e, value: e.split('\u2063')[0] };
                }),
                validation: O.object({
                  value: O.string().required('Required'),
                  label: O.string(),
                }).required('Required'),
              },
              {
                type: k.a.textField,
                name: 'currentDegree',
                label: 'Current Degree',
                value: '',
                validation: O.string().required('Required'),
              },
              {
                type: k.a.textFieldTel,
                name: 'mobileNumber',
                label: 'Mobile Number',
                value: e.mobileNumber,
                validation: O.string()
                  .min(10, 'Please enter a 10-digit mobile number')
                  .max(13, 'Please enter a 10-digit mobile number')
                  .required('Please enter a 10-digit mobile number'),
              },
              {
                type: k.a.radio,
                name: 'interest',
                label: 'What are you most interested in?',
                value: null,
                options: [
                  {
                    value: 'courses',
                    label: 'Learn crucial skills with online courses',
                  },
                  {
                    value: 'assessments',
                    label: 'Practice & upskill with digital tasks',
                  },
                  {
                    value: 'jobs',
                    label: 'Apply for part-time paid internships',
                  },
                ],
                validation: O.string(
                  ['courses', 'jobs', 'assessments'],
                  'Not a valid interest'
                ).required('Required'),
              },
            ]
          );
        },
        T = a(706),
        _ = a.n(T),
        L = a(505),
        I = a.n(L),
        A = a(41),
        R = a(64),
        P = a(21),
        B = a(344),
        W = a(13),
        D = a(333),
        q = (function(e) {
          function t(e) {
            var a;
            return (
              Object(o.a)(this, t),
              ((a = Object(c.a)(
                this,
                Object(l.a)(t).call(this, e)
              )).updateWindowDimensions = function() {
                a.setState({ isMobile: window.innerWidth < 700 });
              }),
              (a.handleSuccess = function() {
                a.setState({ view: A.b.success, isLoading: !1 });
              }),
              (a.state = {
                view: A.b.form,
                isPublic: !0,
                isLoading: !1,
                isMobile: !1,
              }),
              (a.createUser = a.createUser.bind(Object(u.a)(a))),
              (a.handleReset = a.handleReset.bind(Object(u.a)(a))),
              (a.goHome = a.goHome.bind(Object(u.a)(a))),
              (a.goTo = a.goTo.bind(Object(u.a)(a))),
              (a.errorBar = a.errorBar.bind(Object(u.a)(a))),
              a
            );
          }
          return (
            Object(d.a)(t, e),
            Object(s.a)(t, [
              {
                key: 'componentDidMount',
                value: function() {
                  this.updateWindowDimensions(),
                    window.addEventListener(
                      'resize',
                      this.updateWindowDimensions
                    );
                },
              },
              {
                key: 'componentWillUnmount',
                value: function() {
                  window.removeEventListener(
                    'resize',
                    this.updateWindowDimensions
                  );
                },
              },
              {
                key: 'componentWillMount',
                value: function() {
                  Object(B.a)(P.a.SPEEDY_SIGNUP);
                },
              },
              {
                key: 'goTo',
                value: function(e) {
                  this.props.history.replace(e);
                },
              },
              {
                key: 'handleReset',
                value: function() {
                  this.setState({
                    view: A.b.form,
                    isLoading: !1,
                    snackBar: null,
                  });
                },
              },
              {
                key: 'createUser',
                value: function(e) {
                  var t = this;
                  this.setState({ isLoading: !0 });
                  var a = {
                    firstName: e.firstName.trim(),
                    lastName: e.lastName.trim(),
                    email: e.email.trim().toLowerCase(),
                    currentUniversity: e.currentUniversity.trim(),
                    currentDegree: e.currentDegree.trim(),
                    mobileNumber: e.mobileNumber,
                    interest: e.interest,
                  };
                  Object(P.b)(
                    P.a.SPEEDY_SIGNUP,
                    a,
                    (function() {
                      var e = Object(i.a)(
                        r.a.mark(function e(a) {
                          return r.a.wrap(function(e) {
                            for (;;)
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    console.log(a),
                                    (e.next = 3),
                                    Object(D.doSignInWithCustomToken)(
                                      a.data.token
                                    )
                                  );
                                case 3:
                                  t.setState({
                                    isLoading: !1,
                                    view: A.b.success,
                                  });
                                case 4:
                                case 'end':
                                  return e.stop();
                              }
                          }, e);
                        })
                      );
                      return function(t) {
                        return e.apply(this, arguments);
                      };
                    })(),
                    function(e) {
                      console.log('Call speedySignup error: ', e),
                        t.errorBar(e);
                    }
                  );
                },
              },
              {
                key: 'goHome',
                value: function() {
                  this.props.history.push(W.f);
                },
              },
              {
                key: 'errorBar',
                value: function(e) {
                  this.setState({
                    snackBar: { message: e.message, variant: 'error' },
                    isLoading: !1,
                    link: 'signin',
                  });
                },
              },
              {
                key: 'renderForm',
                value: function() {
                  var e = this,
                    t = this.props.classes,
                    a = this.state,
                    n = a.isMobile,
                    r = a.isLoading,
                    i = null;
                  switch (this.props.history.location.hash) {
                    case '#USYD':
                      i = { value: w.a[0].split('\u2063')[0], label: w.a[0] };
                      break;
                    case '#UNSW':
                      i = { value: w.a[1].split('\u2063')[0], label: w.a[1] };
                      break;
                    case '#MQ':
                      i = { value: w.a[2].split('\u2063')[0], label: w.a[2] };
                      break;
                    case '#UTS':
                      i = { value: w.a[3].split('\u2063')[0], label: w.a[3] };
                  }
                  return r
                    ? p.a.createElement(
                        'div',
                        {
                          className: f()(
                            n ? t.mobileForm : t.webForm,
                            t.loadingScreen
                          ),
                        },
                        p.a.createElement(S.a, { size: 64 }),
                        p.a.createElement(
                          v.a,
                          { variant: 'h6' },
                          'Hold on to your hat',
                          ' ',
                          p.a.createElement(
                            'span',
                            { role: 'img', 'aria-label': 'cowboy emoji' },
                            '\ud83e\udd20'
                          )
                        )
                      )
                    : p.a.createElement(
                        y.a,
                        {
                          className: n ? t.mobileForm : t.webForm,
                          container: !0,
                          direction: 'column',
                        },
                        p.a.createElement(
                          y.a,
                          { className: t.header, item: !0 },
                          p.a.createElement(
                            v.a,
                            {
                              variant: n ? 'subtitle1' : 'h6',
                              style: n ? { textAlign: 'center' } : {},
                            },
                            'Welcome to 2hats!'
                          ),
                          p.a.createElement(
                            v.a,
                            {
                              variant: n ? 'body2' : 'subtitle1',
                              style: n ? { textAlign: 'center' } : {},
                              className: t.subhead,
                            },
                            'Sign up to get paid placements and kickstart your professional career'
                          )
                        ),
                        p.a.createElement(N.a, {
                          action: 'Sign up!',
                          actions: {
                            'Sign up!': function(t) {
                              console.log('sign up click', t), e.createUser(t);
                            },
                          },
                          justForm: !0,
                          data: C({ currentUniversity: i }),
                          formFooter: p.a.createElement(x.default, null),
                        })
                      );
                },
              },
              {
                key: 'renderCongrats',
                value: function() {
                  var e = this.props.classes,
                    t = this.state,
                    a = t.isPublic,
                    n = t.isMobile;
                  return p.a.createElement(
                    y.a,
                    {
                      className: n ? e.mobileForm : e.webForm,
                      container: !0,
                      direction: 'column',
                      alignItems: n ? 'center' : 'flex-start',
                      justify: 'space-between',
                    },
                    p.a.createElement(
                      y.a,
                      { item: !0 },
                      p.a.createElement(
                        y.a,
                        { container: !0 },
                        p.a.createElement(
                          v.a,
                          {
                            variant: 'h6',
                            style: n ? { textAlign: 'center' } : {},
                          },
                          'Congratulations, you\u2019re almost there!'
                        ),
                        p.a.createElement(
                          v.a,
                          {
                            variant: 'body2',
                            className: e.subhead,
                            style: n ? { textAlign: 'center' } : {},
                            gutterBottom: !0,
                          },
                          'We\u2019ve ',
                          p.a.createElement('b', null, 'sent you an email'),
                          ' to finish the sign up process.'
                        ),
                        p.a.createElement(
                          v.a,
                          {
                            variant: 'body2',
                            style: n ? { textAlign: 'center' } : {},
                          },
                          'When you\u2019re ready, continue to our dashboard to apply for jobs, complete our short online courses, and pass quick tasks to verify your skills.'
                        )
                      )
                    ),
                    n &&
                      p.a.createElement(
                        y.a,
                        { item: !0, style: { marginTop: 20 } },
                        p.a.createElement('img', { src: I.a, alt: '2hats' })
                      ),
                    p.a.createElement(
                      j.a,
                      {
                        color: 'primary',
                        id: 'reset',
                        className: n ? e.mobileButton : e.button,
                        variant: 'contained',
                        onClick: a ? this.goHome : this.handleReset,
                      },
                      a ? 'Visit Dashboard' : 'Reset Form'
                    )
                  );
                },
              },
              {
                key: 'render',
                value: function() {
                  var e = this.state,
                    t = e.view,
                    a = e.snackBar,
                    n = e.isMobile,
                    r = this.props.classes;
                  return p.a.createElement(
                    y.a,
                    {
                      container: !0,
                      className: r.root,
                      alignItems: 'center',
                      justify: 'center',
                    },
                    p.a.createElement(
                      y.a,
                      { item: !0 },
                      p.a.createElement(
                        g.default,
                        {
                          width: n ? 340 : 680,
                          height: 'auto',
                          logoClass: n ? 'centeredLogo' : 'miniLogo',
                          snackBar: a,
                        },
                        p.a.createElement(
                          y.a,
                          {
                            container: !0,
                            direction: n ? 'column' : 'row',
                            alignItems: 'center',
                          },
                          t === A.b.form
                            ? this.renderForm()
                            : this.renderCongrats(),
                          !n &&
                            p.a.createElement(
                              y.a,
                              { item: !0 },
                              p.a.createElement('img', {
                                className: r.img,
                                src: t === A.b.success ? I.a : _.a,
                                alt: '2hats',
                              })
                            )
                        )
                      )
                    )
                  );
                },
              },
            ]),
            t
          );
        })(m.PureComponent);
      t.default = Object(R.a)(
        E()(function(e) {
          return {
            root: {
              minHeight: '100vh',
              padding: ''.concat(e.spacing(1), 'px 0'),
            },
            subhead: {
              marginTop: e.spacing(1),
              marginBottom: e.spacing(1.5),
              lineHeight: 1.25,
              fontWeight: 400,
            },
            webForm: {
              width: 350,
              minHeight: 200,
              marginLeft: 50,
              marginRight: 50,
              paddingBottom: 40,
              position: 'relative',
            },
            mobileForm: { width: 280, paddingBottom: 40, position: 'relative' },
            button: { width: 180, marginTop: e.spacing(3), marginBottom: 0 },
            loading: { position: 'relative', bottom: -39 },
            mobileButton: {
              width: 180,
              marginTop: e.spacing(3),
              margin: 'auto',
            },
            img: { marginRight: 20, marginBottom: 50 },
            header: { marginBottom: 10 },
            loadingScreen: {
              backgroundColor: '#fff',
              minHeight: 607,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              '& h6': { marginTop: e.spacing(2) },
            },
          };
        })(q)
      );
    },
    653: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(12),
        r = a(0),
        i = a.n(r),
        o = a(121),
        s = a.n(o),
        c = a(58),
        l = a(77),
        u = a(500),
        d = a(487),
        m = a(5),
        p = a(88),
        g = a(59),
        h = function(e, t) {
          var a = Object(p.a)(),
            i = Object(n.a)(a, 2),
            o = i[0],
            c = i[1],
            l = Object(r.useContext)(g.a);
          return (
            Object(r.useEffect)(
              function() {
                if (e.search) {
                  var a = s.a.parse(e.search);
                  a.id && a.id.length > 0
                    ? a.yours && 'true' === a.yours
                      ? c({
                          path: ''
                            .concat(m.COLLECTIONS.users, '/')
                            .concat(l.user.id, '/')
                            .concat(t, '/')
                            .concat(a.id),
                          valid: !0,
                        })
                      : c({ path: ''.concat(t, '/').concat(a.id), valid: !0 })
                    : o.unsubscribe && o.unsubscribe();
                } else c({ doc: null, path: null, prevPath: null });
              },
              [e.search]
            ),
            Object(r.useEffect)(function() {
              return function() {
                o.unsubscribe && o.unsubscribe();
              };
            }, []),
            [o, c]
          );
        },
        f = a(89);
      t.default = Object(c.default)(function(e) {
        var t = e.location,
          a = e.user,
          o = e.history,
          c = t.pathname.replace('/', ''),
          m = h(t, ''.concat(c, 's')),
          p = Object(n.a)(m, 1)[0];
        return (
          Object(r.useEffect)(
            function() {
              (document.title = '2hats \u2013 '.concat(Object(f.a)(c), 's')),
                s.a.parse(t.search).id || o.push(t.pathname + 's');
            },
            [t]
          ),
          Object(r.useEffect)(
            function() {
              p.doc &&
                (document.title = '2hats \u2013\xa0'
                  .concat(Object(f.a)(c), 's \u2013\xa0')
                  .concat(p.doc.title));
            },
            [p.doc]
          ),
          p.doc
            ? 'job' === c
              ? i.a.createElement(u.default, { data: p.doc, user: a })
              : i.a.createElement(d.default, { data: p.doc, user: a })
            : i.a.createElement(l.default, { showNav: !0 })
        );
      });
    },
    683: function(e, t, a) {
      e.exports = a.p + 'static/media/Colour.aa19558c.svg';
    },
    684: function(e, t, a) {
      e.exports = a.p + 'static/media/google-colour.37564f6c.svg';
    },
    689: function(e, t, a) {
      e.exports = a.p + 'static/media/linkedin.1c73a11a.svg';
    },
    706: function(e, t, a) {
      e.exports = a.p + 'static/media/girlWithLaptop.6bb8bd8a.png';
    },
    750: function(e, t, a) {
      e.exports = a(1670);
    },
    77: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(17),
        r = a(0),
        i = a.n(r),
        o = a(16),
        s = a.n(o),
        c = a(11),
        l = a(9),
        u = a(279),
        d = a(7),
        m = a.n(d),
        p = a(278);
      t.default = m()(
        function(e) {
          var t;
          return {
            root: {
              height: '100vh',
              width: '100vw',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              backgroundColor: e.palette.background.paper,
              textAlign: 'center',
              zIndex: 1,
            },
            contained: { width: '100%', position: 'static' },
            fakeNav: ((t = {
              backgroundColor: e.palette.background.paper,
              width: 0,
              height: '100vh',
            }),
            Object(n.a)(t, e.breakpoints.down('sm'), {
              height: 64,
              width: '100vw',
              borderTop: '1px solid '.concat(e.palette.divider),
            }),
            Object(n.a)(t, e.breakpoints.down('xs'), { height: 56 }),
            t),
            circularProgress: { color: '#F15A29' },
            message: { marginTop: e.spacing(1) },
          };
        },
        { withTheme: !0 }
      )(function(e) {
        var t = e.classes,
          a = e.theme,
          n = e.message,
          r = e.contained,
          o = Object(p.a)(a.breakpoints.down('sm'));
        return i.a.createElement(
          c.a,
          {
            container: !0,
            direction: o ? 'column-reverse' : 'row',
            alignItems: 'center',
            justify: 'center',
            className: s()(t.root, r && t.contained),
          },
          i.a.createElement(
            c.a,
            { item: !0 },
            i.a.createElement(u.a, { size: 64, className: t.circularProgress }),
            n &&
              i.a.createElement(l.a, { variant: 'h6', className: t.message }, n)
          )
        );
      });
    },
    79: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(16),
        o = a.n(i),
        s = a(7),
        c = a.n(s),
        l = a(49),
        u = a.n(l),
        d = a(139),
        m = a.n(d);
      t.default = c()(function(e) {
        return {
          root: {
            width: 48,
            height: 48,
            borderRadius: '50%',
            backgroundColor: e.palette.divider,
            color: e.palette.text.primary,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            '& svg': { fontSize: 32 },
          },
          green: { backgroundColor: u.a[100], color: u.a[700] },
          red: { backgroundColor: m.a[100], color: m.a[600] },
          primary: {
            backgroundColor: e.palette.primary.light,
            color: e.palette.primary.main,
          },
        };
      })(function(e) {
        var t = e.classes,
          a = e.className,
          n = e.children,
          i = e.color;
        return r.a.createElement(
          'span',
          { className: o()(t.root, i && t[i], a) },
          n
        );
      });
    },
    83: function(e, t, a) {
      'use strict';
      a.r(t);
      var n = a(0),
        r = a.n(n),
        i = a(9);
      t.default = function(e) {
        var t = e.greeting,
          a = e.name;
        return r.a.createElement(
          i.a,
          {
            variant: 'h6',
            color: 'primary',
            style: { width: '100%', textAlign: 'center', marginBottom: 10 },
          },
          t,
          a ? ',' : null,
          ' ',
          a
        );
      };
    },
    88: function(e, t, a) {
      'use strict';
      var n = a(12),
        r = a(14),
        i = a(33),
        o = a(0),
        s = function(e, t) {
          return Object(r.a)({}, e, t);
        },
        c = { path: null, prevPath: null, doc: null, loading: !0 };
      t.a = function(e) {
        var t = Object(o.useReducer)(s, Object(r.a)({}, c, e)),
          a = Object(n.a)(t, 2),
          l = a[0],
          u = a[1];
        return (
          Object(o.useEffect)(
            function() {
              var e = l.path,
                t = l.prevPath,
                a = l.unsubscribe;
              e &&
                e !== t &&
                (a && a(),
                (function() {
                  u({ prevPath: l.path });
                  var e = i.c.doc(l.path).onSnapshot(function(e) {
                    if (e.exists) {
                      var t = e.data(),
                        a = e.id,
                        n = Object(r.a)({}, t, { id: a });
                      u({ doc: n, loading: !1 });
                    }
                  });
                  u({ unsubscribe: e });
                })());
            },
            [l]
          ),
          Object(o.useEffect)(function() {
            return function() {
              l.unsubscribe && l.unsubscribe();
            };
          }, []),
          [l, u]
        );
      };
    },
    89: function(e, t, a) {
      'use strict';
      a.d(t, 'e', function() {
        return n;
      }),
        a.d(t, 'b', function() {
          return r;
        }),
        a.d(t, 'c', function() {
          return i;
        }),
        a.d(t, 'f', function() {
          return o;
        }),
        a.d(t, 'd', function() {
          return s;
        }),
        a.d(t, 'a', function() {
          return c;
        });
      var n = function(e, t, a) {
          var n = new RegExp(t, 'g');
          return e.replace(n, a);
        },
        r = function(e) {
          var t = document.createElement('input');
          document.body.appendChild(t),
            t.setAttribute('value', e),
            t.select(),
            document.execCommand('copy'),
            document.body.removeChild(t);
        },
        i = function(e) {
          var t = e.match(/\b\w/g) || [];
          return ((t.shift() || '') + (t.pop() || '')).toUpperCase();
        },
        o = function(e) {
          return e.replace(/(<([^>]+)>)/gi, '');
        },
        s = function() {
          return Math.random()
            .toString(36)
            .substring(2);
        },
        c = function(e) {
          return e.charAt(0).toUpperCase() + e.slice(1);
        };
    },
    902: function(e, t, a) {
      var n = {
        './Binary_Property/ASCII.js': 903,
        './Binary_Property/ASCII_Hex_Digit.js': 904,
        './Binary_Property/Alphabetic.js': 905,
        './Binary_Property/Any.js': 906,
        './Binary_Property/Assigned.js': 907,
        './Binary_Property/Bidi_Control.js': 908,
        './Binary_Property/Bidi_Mirrored.js': 909,
        './Binary_Property/Case_Ignorable.js': 910,
        './Binary_Property/Cased.js': 911,
        './Binary_Property/Changes_When_Casefolded.js': 912,
        './Binary_Property/Changes_When_Casemapped.js': 913,
        './Binary_Property/Changes_When_Lowercased.js': 914,
        './Binary_Property/Changes_When_NFKC_Casefolded.js': 915,
        './Binary_Property/Changes_When_Titlecased.js': 916,
        './Binary_Property/Changes_When_Uppercased.js': 917,
        './Binary_Property/Dash.js': 918,
        './Binary_Property/Default_Ignorable_Code_Point.js': 919,
        './Binary_Property/Deprecated.js': 920,
        './Binary_Property/Diacritic.js': 921,
        './Binary_Property/Emoji.js': 922,
        './Binary_Property/Emoji_Component.js': 923,
        './Binary_Property/Emoji_Modifier.js': 924,
        './Binary_Property/Emoji_Modifier_Base.js': 925,
        './Binary_Property/Emoji_Presentation.js': 926,
        './Binary_Property/Extended_Pictographic.js': 927,
        './Binary_Property/Extender.js': 928,
        './Binary_Property/Grapheme_Base.js': 929,
        './Binary_Property/Grapheme_Extend.js': 930,
        './Binary_Property/Hex_Digit.js': 931,
        './Binary_Property/IDS_Binary_Operator.js': 932,
        './Binary_Property/IDS_Trinary_Operator.js': 933,
        './Binary_Property/ID_Continue.js': 934,
        './Binary_Property/ID_Start.js': 935,
        './Binary_Property/Ideographic.js': 936,
        './Binary_Property/Join_Control.js': 937,
        './Binary_Property/Logical_Order_Exception.js': 938,
        './Binary_Property/Lowercase.js': 939,
        './Binary_Property/Math.js': 940,
        './Binary_Property/Noncharacter_Code_Point.js': 941,
        './Binary_Property/Pattern_Syntax.js': 942,
        './Binary_Property/Pattern_White_Space.js': 943,
        './Binary_Property/Quotation_Mark.js': 944,
        './Binary_Property/Radical.js': 945,
        './Binary_Property/Regional_Indicator.js': 946,
        './Binary_Property/Sentence_Terminal.js': 947,
        './Binary_Property/Soft_Dotted.js': 948,
        './Binary_Property/Terminal_Punctuation.js': 949,
        './Binary_Property/Unified_Ideograph.js': 950,
        './Binary_Property/Uppercase.js': 951,
        './Binary_Property/Variation_Selector.js': 952,
        './Binary_Property/White_Space.js': 953,
        './Binary_Property/XID_Continue.js': 954,
        './Binary_Property/XID_Start.js': 955,
        './General_Category/Cased_Letter.js': 956,
        './General_Category/Close_Punctuation.js': 957,
        './General_Category/Connector_Punctuation.js': 958,
        './General_Category/Control.js': 959,
        './General_Category/Currency_Symbol.js': 960,
        './General_Category/Dash_Punctuation.js': 961,
        './General_Category/Decimal_Number.js': 962,
        './General_Category/Enclosing_Mark.js': 963,
        './General_Category/Final_Punctuation.js': 964,
        './General_Category/Format.js': 965,
        './General_Category/Initial_Punctuation.js': 966,
        './General_Category/Letter.js': 967,
        './General_Category/Letter_Number.js': 968,
        './General_Category/Line_Separator.js': 969,
        './General_Category/Lowercase_Letter.js': 970,
        './General_Category/Mark.js': 971,
        './General_Category/Math_Symbol.js': 972,
        './General_Category/Modifier_Letter.js': 973,
        './General_Category/Modifier_Symbol.js': 974,
        './General_Category/Nonspacing_Mark.js': 975,
        './General_Category/Number.js': 976,
        './General_Category/Open_Punctuation.js': 977,
        './General_Category/Other.js': 978,
        './General_Category/Other_Letter.js': 979,
        './General_Category/Other_Number.js': 980,
        './General_Category/Other_Punctuation.js': 981,
        './General_Category/Other_Symbol.js': 982,
        './General_Category/Paragraph_Separator.js': 983,
        './General_Category/Private_Use.js': 984,
        './General_Category/Punctuation.js': 985,
        './General_Category/Separator.js': 986,
        './General_Category/Space_Separator.js': 987,
        './General_Category/Spacing_Mark.js': 988,
        './General_Category/Surrogate.js': 989,
        './General_Category/Symbol.js': 990,
        './General_Category/Titlecase_Letter.js': 991,
        './General_Category/Unassigned.js': 992,
        './General_Category/Uppercase_Letter.js': 993,
        './Script/Adlam.js': 994,
        './Script/Ahom.js': 995,
        './Script/Anatolian_Hieroglyphs.js': 996,
        './Script/Arabic.js': 997,
        './Script/Armenian.js': 998,
        './Script/Avestan.js': 999,
        './Script/Balinese.js': 1e3,
        './Script/Bamum.js': 1001,
        './Script/Bassa_Vah.js': 1002,
        './Script/Batak.js': 1003,
        './Script/Bengali.js': 1004,
        './Script/Bhaiksuki.js': 1005,
        './Script/Bopomofo.js': 1006,
        './Script/Brahmi.js': 1007,
        './Script/Braille.js': 1008,
        './Script/Buginese.js': 1009,
        './Script/Buhid.js': 1010,
        './Script/Canadian_Aboriginal.js': 1011,
        './Script/Carian.js': 1012,
        './Script/Caucasian_Albanian.js': 1013,
        './Script/Chakma.js': 1014,
        './Script/Cham.js': 1015,
        './Script/Cherokee.js': 1016,
        './Script/Common.js': 1017,
        './Script/Coptic.js': 1018,
        './Script/Cuneiform.js': 1019,
        './Script/Cypriot.js': 1020,
        './Script/Cyrillic.js': 1021,
        './Script/Deseret.js': 1022,
        './Script/Devanagari.js': 1023,
        './Script/Dogra.js': 1024,
        './Script/Duployan.js': 1025,
        './Script/Egyptian_Hieroglyphs.js': 1026,
        './Script/Elbasan.js': 1027,
        './Script/Elymaic.js': 1028,
        './Script/Ethiopic.js': 1029,
        './Script/Georgian.js': 1030,
        './Script/Glagolitic.js': 1031,
        './Script/Gothic.js': 1032,
        './Script/Grantha.js': 1033,
        './Script/Greek.js': 1034,
        './Script/Gujarati.js': 1035,
        './Script/Gunjala_Gondi.js': 1036,
        './Script/Gurmukhi.js': 1037,
        './Script/Han.js': 1038,
        './Script/Hangul.js': 1039,
        './Script/Hanifi_Rohingya.js': 1040,
        './Script/Hanunoo.js': 1041,
        './Script/Hatran.js': 1042,
        './Script/Hebrew.js': 1043,
        './Script/Hiragana.js': 1044,
        './Script/Imperial_Aramaic.js': 1045,
        './Script/Inherited.js': 1046,
        './Script/Inscriptional_Pahlavi.js': 1047,
        './Script/Inscriptional_Parthian.js': 1048,
        './Script/Javanese.js': 1049,
        './Script/Kaithi.js': 1050,
        './Script/Kannada.js': 1051,
        './Script/Katakana.js': 1052,
        './Script/Kayah_Li.js': 1053,
        './Script/Kharoshthi.js': 1054,
        './Script/Khmer.js': 1055,
        './Script/Khojki.js': 1056,
        './Script/Khudawadi.js': 1057,
        './Script/Lao.js': 1058,
        './Script/Latin.js': 1059,
        './Script/Lepcha.js': 1060,
        './Script/Limbu.js': 1061,
        './Script/Linear_A.js': 1062,
        './Script/Linear_B.js': 1063,
        './Script/Lisu.js': 1064,
        './Script/Lycian.js': 1065,
        './Script/Lydian.js': 1066,
        './Script/Mahajani.js': 1067,
        './Script/Makasar.js': 1068,
        './Script/Malayalam.js': 1069,
        './Script/Mandaic.js': 1070,
        './Script/Manichaean.js': 1071,
        './Script/Marchen.js': 1072,
        './Script/Masaram_Gondi.js': 1073,
        './Script/Medefaidrin.js': 1074,
        './Script/Meetei_Mayek.js': 1075,
        './Script/Mende_Kikakui.js': 1076,
        './Script/Meroitic_Cursive.js': 1077,
        './Script/Meroitic_Hieroglyphs.js': 1078,
        './Script/Miao.js': 1079,
        './Script/Modi.js': 1080,
        './Script/Mongolian.js': 1081,
        './Script/Mro.js': 1082,
        './Script/Multani.js': 1083,
        './Script/Myanmar.js': 1084,
        './Script/Nabataean.js': 1085,
        './Script/Nandinagari.js': 1086,
        './Script/New_Tai_Lue.js': 1087,
        './Script/Newa.js': 1088,
        './Script/Nko.js': 1089,
        './Script/Nushu.js': 1090,
        './Script/Nyiakeng_Puachue_Hmong.js': 1091,
        './Script/Ogham.js': 1092,
        './Script/Ol_Chiki.js': 1093,
        './Script/Old_Hungarian.js': 1094,
        './Script/Old_Italic.js': 1095,
        './Script/Old_North_Arabian.js': 1096,
        './Script/Old_Permic.js': 1097,
        './Script/Old_Persian.js': 1098,
        './Script/Old_Sogdian.js': 1099,
        './Script/Old_South_Arabian.js': 1100,
        './Script/Old_Turkic.js': 1101,
        './Script/Oriya.js': 1102,
        './Script/Osage.js': 1103,
        './Script/Osmanya.js': 1104,
        './Script/Pahawh_Hmong.js': 1105,
        './Script/Palmyrene.js': 1106,
        './Script/Pau_Cin_Hau.js': 1107,
        './Script/Phags_Pa.js': 1108,
        './Script/Phoenician.js': 1109,
        './Script/Psalter_Pahlavi.js': 1110,
        './Script/Rejang.js': 1111,
        './Script/Runic.js': 1112,
        './Script/Samaritan.js': 1113,
        './Script/Saurashtra.js': 1114,
        './Script/Sharada.js': 1115,
        './Script/Shavian.js': 1116,
        './Script/Siddham.js': 1117,
        './Script/SignWriting.js': 1118,
        './Script/Sinhala.js': 1119,
        './Script/Sogdian.js': 1120,
        './Script/Sora_Sompeng.js': 1121,
        './Script/Soyombo.js': 1122,
        './Script/Sundanese.js': 1123,
        './Script/Syloti_Nagri.js': 1124,
        './Script/Syriac.js': 1125,
        './Script/Tagalog.js': 1126,
        './Script/Tagbanwa.js': 1127,
        './Script/Tai_Le.js': 1128,
        './Script/Tai_Tham.js': 1129,
        './Script/Tai_Viet.js': 1130,
        './Script/Takri.js': 1131,
        './Script/Tamil.js': 1132,
        './Script/Tangut.js': 1133,
        './Script/Telugu.js': 1134,
        './Script/Thaana.js': 1135,
        './Script/Thai.js': 1136,
        './Script/Tibetan.js': 1137,
        './Script/Tifinagh.js': 1138,
        './Script/Tirhuta.js': 1139,
        './Script/Ugaritic.js': 1140,
        './Script/Vai.js': 1141,
        './Script/Wancho.js': 1142,
        './Script/Warang_Citi.js': 1143,
        './Script/Yi.js': 1144,
        './Script/Zanabazar_Square.js': 1145,
        './Script_Extensions/Adlam.js': 1146,
        './Script_Extensions/Ahom.js': 1147,
        './Script_Extensions/Anatolian_Hieroglyphs.js': 1148,
        './Script_Extensions/Arabic.js': 1149,
        './Script_Extensions/Armenian.js': 1150,
        './Script_Extensions/Avestan.js': 1151,
        './Script_Extensions/Balinese.js': 1152,
        './Script_Extensions/Bamum.js': 1153,
        './Script_Extensions/Bassa_Vah.js': 1154,
        './Script_Extensions/Batak.js': 1155,
        './Script_Extensions/Bengali.js': 1156,
        './Script_Extensions/Bhaiksuki.js': 1157,
        './Script_Extensions/Bopomofo.js': 1158,
        './Script_Extensions/Brahmi.js': 1159,
        './Script_Extensions/Braille.js': 1160,
        './Script_Extensions/Buginese.js': 1161,
        './Script_Extensions/Buhid.js': 1162,
        './Script_Extensions/Canadian_Aboriginal.js': 1163,
        './Script_Extensions/Carian.js': 1164,
        './Script_Extensions/Caucasian_Albanian.js': 1165,
        './Script_Extensions/Chakma.js': 1166,
        './Script_Extensions/Cham.js': 1167,
        './Script_Extensions/Cherokee.js': 1168,
        './Script_Extensions/Common.js': 1169,
        './Script_Extensions/Coptic.js': 1170,
        './Script_Extensions/Cuneiform.js': 1171,
        './Script_Extensions/Cypriot.js': 1172,
        './Script_Extensions/Cyrillic.js': 1173,
        './Script_Extensions/Deseret.js': 1174,
        './Script_Extensions/Devanagari.js': 1175,
        './Script_Extensions/Dogra.js': 1176,
        './Script_Extensions/Duployan.js': 1177,
        './Script_Extensions/Egyptian_Hieroglyphs.js': 1178,
        './Script_Extensions/Elbasan.js': 1179,
        './Script_Extensions/Elymaic.js': 1180,
        './Script_Extensions/Ethiopic.js': 1181,
        './Script_Extensions/Georgian.js': 1182,
        './Script_Extensions/Glagolitic.js': 1183,
        './Script_Extensions/Gothic.js': 1184,
        './Script_Extensions/Grantha.js': 1185,
        './Script_Extensions/Greek.js': 1186,
        './Script_Extensions/Gujarati.js': 1187,
        './Script_Extensions/Gunjala_Gondi.js': 1188,
        './Script_Extensions/Gurmukhi.js': 1189,
        './Script_Extensions/Han.js': 1190,
        './Script_Extensions/Hangul.js': 1191,
        './Script_Extensions/Hanifi_Rohingya.js': 1192,
        './Script_Extensions/Hanunoo.js': 1193,
        './Script_Extensions/Hatran.js': 1194,
        './Script_Extensions/Hebrew.js': 1195,
        './Script_Extensions/Hiragana.js': 1196,
        './Script_Extensions/Imperial_Aramaic.js': 1197,
        './Script_Extensions/Inherited.js': 1198,
        './Script_Extensions/Inscriptional_Pahlavi.js': 1199,
        './Script_Extensions/Inscriptional_Parthian.js': 1200,
        './Script_Extensions/Javanese.js': 1201,
        './Script_Extensions/Kaithi.js': 1202,
        './Script_Extensions/Kannada.js': 1203,
        './Script_Extensions/Katakana.js': 1204,
        './Script_Extensions/Kayah_Li.js': 1205,
        './Script_Extensions/Kharoshthi.js': 1206,
        './Script_Extensions/Khmer.js': 1207,
        './Script_Extensions/Khojki.js': 1208,
        './Script_Extensions/Khudawadi.js': 1209,
        './Script_Extensions/Lao.js': 1210,
        './Script_Extensions/Latin.js': 1211,
        './Script_Extensions/Lepcha.js': 1212,
        './Script_Extensions/Limbu.js': 1213,
        './Script_Extensions/Linear_A.js': 1214,
        './Script_Extensions/Linear_B.js': 1215,
        './Script_Extensions/Lisu.js': 1216,
        './Script_Extensions/Lycian.js': 1217,
        './Script_Extensions/Lydian.js': 1218,
        './Script_Extensions/Mahajani.js': 1219,
        './Script_Extensions/Makasar.js': 1220,
        './Script_Extensions/Malayalam.js': 1221,
        './Script_Extensions/Mandaic.js': 1222,
        './Script_Extensions/Manichaean.js': 1223,
        './Script_Extensions/Marchen.js': 1224,
        './Script_Extensions/Masaram_Gondi.js': 1225,
        './Script_Extensions/Medefaidrin.js': 1226,
        './Script_Extensions/Meetei_Mayek.js': 1227,
        './Script_Extensions/Mende_Kikakui.js': 1228,
        './Script_Extensions/Meroitic_Cursive.js': 1229,
        './Script_Extensions/Meroitic_Hieroglyphs.js': 1230,
        './Script_Extensions/Miao.js': 1231,
        './Script_Extensions/Modi.js': 1232,
        './Script_Extensions/Mongolian.js': 1233,
        './Script_Extensions/Mro.js': 1234,
        './Script_Extensions/Multani.js': 1235,
        './Script_Extensions/Myanmar.js': 1236,
        './Script_Extensions/Nabataean.js': 1237,
        './Script_Extensions/Nandinagari.js': 1238,
        './Script_Extensions/New_Tai_Lue.js': 1239,
        './Script_Extensions/Newa.js': 1240,
        './Script_Extensions/Nko.js': 1241,
        './Script_Extensions/Nushu.js': 1242,
        './Script_Extensions/Nyiakeng_Puachue_Hmong.js': 1243,
        './Script_Extensions/Ogham.js': 1244,
        './Script_Extensions/Ol_Chiki.js': 1245,
        './Script_Extensions/Old_Hungarian.js': 1246,
        './Script_Extensions/Old_Italic.js': 1247,
        './Script_Extensions/Old_North_Arabian.js': 1248,
        './Script_Extensions/Old_Permic.js': 1249,
        './Script_Extensions/Old_Persian.js': 1250,
        './Script_Extensions/Old_Sogdian.js': 1251,
        './Script_Extensions/Old_South_Arabian.js': 1252,
        './Script_Extensions/Old_Turkic.js': 1253,
        './Script_Extensions/Oriya.js': 1254,
        './Script_Extensions/Osage.js': 1255,
        './Script_Extensions/Osmanya.js': 1256,
        './Script_Extensions/Pahawh_Hmong.js': 1257,
        './Script_Extensions/Palmyrene.js': 1258,
        './Script_Extensions/Pau_Cin_Hau.js': 1259,
        './Script_Extensions/Phags_Pa.js': 1260,
        './Script_Extensions/Phoenician.js': 1261,
        './Script_Extensions/Psalter_Pahlavi.js': 1262,
        './Script_Extensions/Rejang.js': 1263,
        './Script_Extensions/Runic.js': 1264,
        './Script_Extensions/Samaritan.js': 1265,
        './Script_Extensions/Saurashtra.js': 1266,
        './Script_Extensions/Sharada.js': 1267,
        './Script_Extensions/Shavian.js': 1268,
        './Script_Extensions/Siddham.js': 1269,
        './Script_Extensions/SignWriting.js': 1270,
        './Script_Extensions/Sinhala.js': 1271,
        './Script_Extensions/Sogdian.js': 1272,
        './Script_Extensions/Sora_Sompeng.js': 1273,
        './Script_Extensions/Soyombo.js': 1274,
        './Script_Extensions/Sundanese.js': 1275,
        './Script_Extensions/Syloti_Nagri.js': 1276,
        './Script_Extensions/Syriac.js': 1277,
        './Script_Extensions/Tagalog.js': 1278,
        './Script_Extensions/Tagbanwa.js': 1279,
        './Script_Extensions/Tai_Le.js': 1280,
        './Script_Extensions/Tai_Tham.js': 1281,
        './Script_Extensions/Tai_Viet.js': 1282,
        './Script_Extensions/Takri.js': 1283,
        './Script_Extensions/Tamil.js': 1284,
        './Script_Extensions/Tangut.js': 1285,
        './Script_Extensions/Telugu.js': 1286,
        './Script_Extensions/Thaana.js': 1287,
        './Script_Extensions/Thai.js': 1288,
        './Script_Extensions/Tibetan.js': 1289,
        './Script_Extensions/Tifinagh.js': 1290,
        './Script_Extensions/Tirhuta.js': 1291,
        './Script_Extensions/Ugaritic.js': 1292,
        './Script_Extensions/Vai.js': 1293,
        './Script_Extensions/Wancho.js': 1294,
        './Script_Extensions/Warang_Citi.js': 1295,
        './Script_Extensions/Yi.js': 1296,
        './Script_Extensions/Zanabazar_Square.js': 1297,
        './index.js': 1298,
        './unicode-version.js': 1299,
      };
      function r(e) {
        var t = i(e);
        return a(t);
      }
      function i(e) {
        if (!a.o(n, e)) {
          var t = new Error("Cannot find module '" + e + "'");
          throw ((t.code = 'MODULE_NOT_FOUND'), t);
        }
        return n[e];
      }
      (r.keys = function() {
        return Object.keys(n);
      }),
        (r.resolve = i),
        (e.exports = r),
        (r.id = 902);
    },
  },
  [[750, 1, 2]],
]);
