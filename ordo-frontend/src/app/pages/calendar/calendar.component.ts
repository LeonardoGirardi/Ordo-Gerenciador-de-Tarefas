import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  today: Date = new Date();
  currentMonth: Date = new Date();
  calendarDays: CalendarDay[] = [];
  monthNames: string[] = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  dayNames: string[] = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar(): void {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();

    // Primeiro dia do mês
    const firstDay = new Date(year, month, 1);
    // Último dia do mês
    const lastDay = new Date(year, month + 1, 0);

    // Dia da semana do primeiro dia (0 = domingo)
    const firstDayWeekday = firstDay.getDay();

    this.calendarDays = [];

    // Adiciona os dias do mês anterior para completar a primeira semana
    for (let i = firstDayWeekday - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      this.calendarDays.push({
        date: prevDate,
        dayNumber: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: this.isSameDay(prevDate, this.today)
      });
    }

    // Adiciona todos os dias do mês atual
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(year, month, day);
      this.calendarDays.push({
        date: date,
        dayNumber: day,
        isCurrentMonth: true,
        isToday: this.isSameDay(date, this.today)
      });
    }

    // Adiciona os dias do próximo mês para completar a última semana
    const totalCells = 42; // 6 semanas x 7 dias
    const remainingCells = totalCells - this.calendarDays.length;

    for (let day = 1; day <= remainingCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      this.calendarDays.push({
        date: nextDate,
        dayNumber: day,
        isCurrentMonth: false,
        isToday: this.isSameDay(nextDate, this.today)
      });
    }
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear();
  }

  onDayClick(calendarDay: CalendarDay): void {
    const year = calendarDay.date.getFullYear();
    const month = String(calendarDay.date.getMonth() + 1).padStart(2, '0');
    const day = String(calendarDay.date.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    this.router.navigate(['/kanban'], { queryParams: { date: dateString } });
  }

  previousMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() - 1, 1);
    this.generateCalendar();
  }

  nextMonth(): void {
    this.currentMonth = new Date(this.currentMonth.getFullYear(), this.currentMonth.getMonth() + 1, 1);
    this.generateCalendar();
  }

  getCurrentMonthYear(): string {
    const monthName = this.monthNames[this.currentMonth.getMonth()];
    const year = this.currentMonth.getFullYear();
    return `${monthName} ${year}`;
  }

  goToToday(): void {
    this.currentMonth = new Date();
    this.generateCalendar();
  }

  getDayButtonClass(calendarDay: CalendarDay): string {
    let classes = 'btn day-btn';

    if (calendarDay.isToday) {
      classes += ' btn-primary';
    } else if (calendarDay.isCurrentMonth) {
      classes += ' btn-outline-secondary';
    } else {
      classes += ' btn-outline-light text-muted';
    }

    return classes;
  }
}
