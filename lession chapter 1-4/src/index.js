import _ from 'lodash'
import $ from 'jquery'
import { ui } from './jquery.ui'

ui()

console.log(this)

const dom = $('<div>')
dom.html(_.join(['dell', 'lee'],' '))
$('body').append()