'use strict';
const expect = require('chai').expect;
const sinon = require('sinon');
require('chai').use(require('sinon-chai'));

const SonosSystem = require('../../lib/SonosSystem');

describe('System test', () => {
  let system;

  before((done) => {
    system = new SonosSystem();
    system.on('topology-change', () => done());
  });

  after(() => {
   // system.dispose();
  });

  it('Has zones', () => {
    expect(system.zones).not.empty;
  });

  it('Pauses', (done) => {
    let player = system.getPlayer('Office');
    player.coordinator.pause()
      .then(() => {
        return player.coordinator.play();
      })
      .then(() => {
        done();
      });
  });

  it.only('Changes subGain', (done) => {
    let player = system.getPlayer('TV Room');
    player.sub.setGain(10)
      .then(() => {
        done();
      });
  });
});