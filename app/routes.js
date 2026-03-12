const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

function generateReference (prefix) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let ref = prefix + '-'
  for (let i = 0; i < 8; i++) {
    ref += chars[Math.floor(Math.random() * chars.length)]
  }
  return ref
}

router.get('/', function (req, res) {
  res.redirect('/start')
})

router.get('/receiving-benefits', function (req, res) {
  res.render('receiving-benefits')
})

router.post('/receiving-benefits', function (req, res) {
  const answer = req.session.data['receiving-benefits']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'receiving-benefits': 'Select yes if you are receiving benefits or tax credits, or no if you are not' }
    return res.render('receiving-benefits')
  }
  if (answer === 'no') {
    return res.redirect('/ineligible-receiving-benefits')
  }
  res.redirect('/child-name')
})

router.get('/ineligible-receiving-benefits', function (req, res) {
  res.render('ineligible-receiving-benefits')
})

router.get('/child-name', function (req, res) {
  res.render('child-name')
})

router.post('/child-name', function (req, res) {
  const answer = req.session.data['child-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-name': 'Enter your child\'s full name' }
    return res.render('child-name')
  }
  res.redirect('/child-date-of-birth')
})

router.get('/child-date-of-birth', function (req, res) {
  res.render('child-date-of-birth')
})

router.post('/child-date-of-birth', function (req, res) {
  const answer = req.session.data['child-date-of-birth']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'child-date-of-birth': 'Enter your child\'s date of birth' }
    return res.render('child-date-of-birth')
  }
  res.redirect('/school-name')
})

router.get('/school-name', function (req, res) {
  res.render('school-name')
})

router.post('/school-name', function (req, res) {
  const answer = req.session.data['school-name']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'school-name': 'Enter your child\'s school name' }
    return res.render('school-name')
  }
  res.redirect('/national-insurance-number')
})

router.get('/national-insurance-number', function (req, res) {
  res.render('national-insurance-number')
})

router.post('/national-insurance-number', function (req, res) {
  const answer = req.session.data['national-insurance-number']
  if (!answer || !answer.toString().trim()) {
    res.locals.errors = { 'national-insurance-number': 'Enter your National Insurance number' }
    return res.render('national-insurance-number')
  }
  res.redirect('/check-answers')
})

router.get('/check-answers', function (req, res) {
  res.render('check-answers')
})

router.post('/check-answers', function (req, res) {
  if (!req.session.data['reference']) {
    req.session.data['reference'] = generateReference('FSM')
  }
  res.redirect('/confirmation')
})

router.get('/confirmation', function (req, res) {
  res.render('confirmation')
})

module.exports = router
