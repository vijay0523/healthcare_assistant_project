import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockchainInterfaceComponent } from './blockchain-interface.component';

describe('BlockchainInterfaceComponent', () => {
  let component: BlockchainInterfaceComponent;
  let fixture: ComponentFixture<BlockchainInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockchainInterfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockchainInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
