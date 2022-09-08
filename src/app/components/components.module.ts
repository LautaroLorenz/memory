import { NgModule } from "@angular/core";

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TooltipModule } from 'primeng/tooltip';
import { RippleModule } from 'primeng/ripple';
import { CheckboxModule } from 'primeng/checkbox';
import { MenuModule } from 'primeng/menu';
import { TabMenuModule } from 'primeng/tabmenu';
import { SplitterModule } from 'primeng/splitter';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SpeedDialModule } from 'primeng/speeddial';
import { DragDropModule } from 'primeng/dragdrop';
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { StepsModule } from 'primeng/steps';
import { FileUploadModule } from 'primeng/fileupload';
import { BoardComponent } from './board/board.component';
import { CommonModule } from "@angular/common";
import { SlotComponent } from './slot/slot.component';
import { MessageService } from 'primeng/api';
import { FocusTrapModule } from 'primeng/focustrap';

const PrimeNgModules: any = [
  MenubarModule,
  CardModule,
  FieldsetModule,
  PanelModule,
  ToolbarModule,
  ButtonModule,
  InputTextModule,
  TableModule,
  DividerModule,
  ConfirmDialogModule,
  ToastModule,
  DialogModule,
  DropdownModule,
  InputNumberModule,
  TooltipModule,
  RippleModule,
  CheckboxModule,
  MenuModule,
  TabMenuModule,
  SplitterModule,
  SplitButtonModule,
  SpeedDialModule,
  DragDropModule,
  InputSwitchModule,
  SelectButtonModule,
  OverlayPanelModule,
  MessagesModule,
  MessageModule,
  ProgressSpinnerModule,
  ProgressBarModule,
  StepsModule,
  FileUploadModule,
  FocusTrapModule,
];

const SharedComponents: any = [
  BoardComponent,
  SlotComponent,
];

const PrimeNgServices: any = [
  MessageService
];

@NgModule({
  declarations: [SharedComponents],
  imports: [
    CommonModule,
    PrimeNgModules,
  ],
  exports: [SharedComponents, PrimeNgModules],
  providers: [PrimeNgServices]
})
export class ComponentsModule { }
