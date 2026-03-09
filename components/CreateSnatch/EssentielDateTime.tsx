// EssentielDatePicker.tsx
import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from 'react-native';
import { Colors } from '../../theme/colors';
import { Fonts } from '../../theme/fonts';

type Props = {
  startDate?: Date | null;
  setStartDate: (d: Date) => void;
  endDate?: Date | null;
  setEndDate: (d: Date) => void;
};

export default function EssentielDatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: Props) {
  const [isStartModalVisible, setStartModalVisible] = useState(false);
  const [isEndModalVisible, setEndModalVisible] = useState(false);

  // tempDate utilisé dans le modal (édition avant confirmation)
  const [tempDate, setTempDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(19, 0, 0, 0); // default 19:00
    return d;
  });

  // extended wheel (jour/mois/année)
  const [showExtendedWheel, setShowExtendedWheel] = useState(false);

  // Helper : friendly display format
  const formatFriendly = (date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    const time = `${date.getHours().toString().padStart(2, '0')}:${date
      .getMinutes()
      .toString()
      .padStart(2, '0')}`;

    const options: Intl.DateTimeFormatOptions = { weekday: 'short', day: 'numeric', month: 'short' };

    if (date.toDateString() === now.toDateString()) return `Aujourd’hui · ${time}`;
    if (date.toDateString() === tomorrow.toDateString()) return `Demain · ${time}`;

    return `${date.toLocaleDateString('fr-FR', options)} · ${time}`;
  };

  // minutes steps: 5
  const minutes = useMemo(() => ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'], []);

  // quick 14-day list
  const quickDays = useMemo(() => {
    const arr: Date[] = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  // Helpers to open modals with sensible default tempDate
  const openStart = () => {
    if (startDate) setTempDate(new Date(startDate));
    else {
      const d = new Date();
      d.setHours(19, 0, 0, 0);
      setTempDate(d);
    }
    setShowExtendedWheel(false);
    setStartModalVisible(true);
  };
  const openEnd = () => {
    if (endDate) setTempDate(new Date(endDate));
    else {
      const d = new Date();
      d.setHours(19, 0, 0, 0);
      setTempDate(d);
    }
    setShowExtendedWheel(false);
    setEndModalVisible(true);
  };

  // Utility to set hour/minute preserving other fields
  const setHour = (h: number) => {
    const d = new Date(tempDate);
    d.setHours(h);
    setTempDate(d);
  };
  const setMinute = (m: number) => {
    const d = new Date(tempDate);
    d.setMinutes(m);
    setTempDate(d);
  };

  // Extended wheel values
  const daysWheel = useMemo(() => Array.from({ length: 31 }, (_, i) => i + 1), []);
  const monthsWheel = useMemo(() => Array.from({ length: 12 }, (_, i) => i), []); // 0..11
  const yearsWheel = useMemo(() => {
    const y0 = new Date().getFullYear();
    return Array.from({ length: 7 }, (_, i) => y0 + i); // this year .. +6
  }, []);

  // Render small calendar (quickDays)
  const renderQuickDays = () =>
    quickDays.map((d) => {
      const isSelected = d.toDateString() === tempDate.toDateString();
      return (
        <TouchableOpacity
          key={d.toDateString()}
          style={isSelected ? styles.calendarDaySelected : styles.calendarDay}
          onPress={() => {
            const nd = new Date(tempDate);
            nd.setFullYear(d.getFullYear(), d.getMonth(), d.getDate());
            setTempDate(nd);
          }}
        >
          <Text style={styles.calendarDayText}>{d.toLocaleDateString('fr-FR', { weekday: 'short' })}</Text>
          <Text style={styles.calendarDayNumber}>{d.getDate()}</Text>
        </TouchableOpacity>
      );
    });

  // Render Hours column
  const renderHours = () =>
    Array.from({ length: 24 }, (_, i) => i).map((h) => {
      const isSel = tempDate.getHours() === h;
      return (
        <TouchableOpacity
          key={`h-${h}`}
          style={styles.timeItem}
          onPress={() => setHour(h)}
          activeOpacity={0.8}
        >
          <Text style={isSel ? styles.timeTextSelected : styles.timeText}>{h.toString().padStart(2, '0')}</Text>
        </TouchableOpacity>
      );
    });

  // Render Minutes column
  const renderMinutes = () =>
    minutes.map((m) => {
      const mm = parseInt(m, 10);
      const isSel = tempDate.getMinutes() === mm;
      return (
        <TouchableOpacity
          key={`m-${m}`}
          style={styles.timeItem}
          onPress={() => setMinute(mm)}
          activeOpacity={0.8}
        >
          <Text style={isSel ? styles.timeTextSelected : styles.timeText}>{m}</Text>
        </TouchableOpacity>
      );
    });

  // Extended wheel renderers (day / month / year)
  const renderExtendedDay = () =>
    daysWheel.map((day) => {
      const isSel = tempDate.getDate() === day;
      return (
        <TouchableOpacity
          key={`ed-${day}`}
          style={styles.timeItem}
          onPress={() => {
            const d = new Date(tempDate);
            d.setDate(day);
            setTempDate(d);
          }}
        >
          <Text style={isSel ? styles.timeTextSelected : styles.timeText}>{String(day).padStart(2, '0')}</Text>
        </TouchableOpacity>
      );
    });
  const renderExtendedMonth = () =>
    monthsWheel.map((m) => {
      const isSel = tempDate.getMonth() === m;
      const label = new Date(2020, m, 1).toLocaleString('fr-FR', { month: 'short' });
      return (
        <TouchableOpacity
          key={`em-${m}`}
          style={styles.timeItem}
          onPress={() => {
            const d = new Date(tempDate);
            d.setMonth(m);
            setTempDate(d);
          }}
        >
          <Text style={isSel ? styles.timeTextSelected : styles.timeText}>{label}</Text>
        </TouchableOpacity>
      );
    });
  const renderExtendedYear = () =>
    yearsWheel.map((y) => {
      const isSel = tempDate.getFullYear() === y;
      return (
        <TouchableOpacity
          key={`ey-${y}`}
          style={styles.timeItem}
          onPress={() => {
            const d = new Date(tempDate);
            d.setFullYear(y);
            setTempDate(d);
          }}
        >
          <Text style={isSel ? styles.timeTextSelected : styles.timeText}>{String(y)}</Text>
        </TouchableOpacity>
      );
    });

  // Confirm handlers
  const confirmStart = () => {
    setStartDate(new Date(tempDate));
    setStartModalVisible(false);
  };
  const confirmEnd = () => {
    setEndDate(new Date(tempDate));
    setEndModalVisible(false);
  };

  // Modal component (shared)
  const PickerModal = ({ visible, onClose, onConfirm }: { visible: boolean; onClose: () => void; onConfirm: () => void }) => {
    return (
      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalSheet}>
            <Text style={styles.modalTitle}>Choisir date & heure</Text>

            {/* quick 14-day row + "Plus" last tile */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 6 }}>
              {renderQuickDays()}
              <TouchableOpacity
                style={styles.calendarDay}
                onPress={() => setShowExtendedWheel((s) => !s)}
              >
                <Text style={styles.calendarDayText}>Plus</Text>
                <Text style={styles.calendarDayNumber}>📅</Text>
              </TouchableOpacity>
            </ScrollView>

            {/* Extended wheel (day / month / year) or hidden */}
            {showExtendedWheel && (
              <View style={styles.extendedWheelRow}>
                <ScrollView style={styles.extWheelColumn}>{renderExtendedDay()}</ScrollView>
                <ScrollView style={styles.extWheelColumn}>{renderExtendedMonth()}</ScrollView>
                <ScrollView style={styles.extWheelColumn}>{renderExtendedYear()}</ScrollView>
              </View>
            )}

            {/* time picker wheels (hours : minutes) */}
            <View style={styles.timeContainer}>
              <ScrollView style={styles.timeColumn} showsVerticalScrollIndicator={false}>{renderHours()}</ScrollView>

              {/* separator ":" */}
              <View style={styles.colonContainer}>
                <Text style={styles.colon}>:</Text>
              </View>

              <ScrollView style={styles.timeColumn} showsVerticalScrollIndicator={false}>{renderMinutes()}</ScrollView>
            </View>

            {/* Confirm / Cancel */}
            <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
              <Text style={styles.confirmText}>Confirmer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelText}>Annuler</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      {/* timeline column */}
      <View style={styles.timelineColumn}>
        <View style={[styles.dot, styles.dotFilled]} />
        <View style={styles.verticalLine} />
        <View style={styles.dot} />
      </View>

      <View style={{ flex: 1}}>
        {/* DEBUT */}
        <TouchableOpacity onPress={openStart} style={styles.row}>
          <Text style={styles.label}>Début</Text>
          <Text style={styles.value}>{startDate ? formatFriendly(startDate) : 'Choisir date/heure'}</Text>
        </TouchableOpacity>

        <View style={styles.horizontalLine} />

        {/* FIN */}
        <TouchableOpacity onPress={openEnd} style={styles.row}>
          <Text style={styles.label}>Fin</Text>
          <Text style={styles.value}>{endDate ? formatFriendly(endDate) : 'Choisir date/heure'}</Text>
        </TouchableOpacity>
      </View>

      {/* Modals */}
      <PickerModal
        visible={isStartModalVisible}
        onClose={() => {
          setStartModalVisible(false);
          setShowExtendedWheel(false);
        }}
        onConfirm={confirmStart}
      />
      <PickerModal
        visible={isEndModalVisible}
        onClose={() => {
          setEndModalVisible(false);
          setShowExtendedWheel(false);
        }}
        onConfirm={confirmEnd}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
  },

  timelineColumn: {
  width: 16,
  alignItems: 'center',
  paddingTop: 4,
  paddingBottom: 4,
  justifyContent: 'space-between', // <— ALIGNEMENT PARFAIT
},
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.secondaryText,
  },
  dotFilled: { backgroundColor: Colors.secondaryText },
  verticalLine: {
    width: 0.5,
    backgroundColor: Colors.secondaryText,
    flex: 1,
    marginVertical: 6,
  },

  row: {
  paddingVertical: 0,
  paddingLeft: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
  label: {
    fontFamily: Fonts.Medium,
    fontSize: 14,
    color: Colors.secondaryText,
  },
  value: {
    fontFamily: Fonts.Regular,
    fontSize: 16,
    marginTop: 4,
    color: Colors.text,
  },

  horizontalLine: {
    height: 1,
    backgroundColor: Colors.secondaryText,
    opacity: 0.25,
    marginVertical: 8,
  },

  /* Modal */
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: Colors.cardBackground,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 18,
    maxHeight: '80%',
  },
  modalTitle: {
    fontFamily: Fonts.Bold,
    fontSize: 18,
    marginBottom: 12,
    color: Colors.text,
  },

  /* Quick calendar */
  calendarRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
  },
  calendarDay: {
    width: 58,
    height: 66,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardBackground,
    marginRight: 8,
  },
  calendarDaySelected: {
    width: 58,
    height: 66,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    marginRight: 8,
  },
  calendarDayText: {
    fontFamily: Fonts.Medium,
    fontSize: 12,
    color: Colors.secondaryText,
  },
  calendarDayNumber: {
    fontFamily: Fonts.Bold,
    fontSize: 16,
    marginTop: 6,
    color: Colors.text,
  },

  /* Extended wheel */
  extendedWheelRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  extWheelColumn: {
    flex: 1,
    maxHeight: 140,
    paddingHorizontal: 6,
  },

  /* time wheels */
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  timeColumn: {
    width: 120,
    maxHeight: 140,
  },
  colonContainer: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  colon: {
    fontSize: 28,
    fontFamily: Fonts.Bold,
    color: Colors.text,
  },
  timeItem: {
    paddingVertical: 8,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 20,
    fontFamily: Fonts.Medium,
    color: Colors.text,
    opacity: 0.35,
  },
  timeTextSelected: {
    fontSize: 26,
    fontFamily: Fonts.Bold,
    color: Colors.text,
    opacity: 1,
  },

  confirmButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 10,
    alignItems: 'center',
  },
  confirmText: {
    color: 'white',
    fontFamily: Fonts.Bold,
    fontSize: 16,
  },

  cancelButton: { paddingVertical: 8 },
  cancelText: {
    color: Colors.secondaryText,
    fontFamily: Fonts.Medium,
    textAlign: 'center',
  },
});
