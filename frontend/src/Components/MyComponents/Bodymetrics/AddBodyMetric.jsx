import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/Components/ui/card';
import { Field, FieldGroup, FieldLabel } from '@/Components/ui/field';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useAppContext } from '@/Context/AppContext';
import React, { useState } from 'react';
import { toast } from 'sonner';

const METRIC_TYPES = [
    'weight',
    'height',
    'bodyFat',
    'chest',
    'waist',
    'hips',
    'arms',
    'forearms',
    'thighs',
    'calves',
    'neck',
    'shoulders',
    'bloodPressureSystolic',
    'bloodPressureDiastolic',
    'heartRate',
    'restingHeartRate',
    'bloodSugar',
    'fastingBloodSugar',
    'oxygenSaturation'
];

const UNIT_MAP = {
    weight: ['kg', 'lbs'],
    height: ['cm', 'inch', 'ft'],
    bodyFat: ['%'],
    chest: ['cm', 'inch'],
    waist: ['cm', 'inch'],
    hips: ['cm', 'inch'],
    arms: ['cm', 'inch'],
    forearms: ['cm', 'inch'],
    thighs: ['cm', 'inch'],
    calves: ['cm', 'inch'],
    neck: ['cm', 'inch'],
    shoulders: ['cm', 'inch'],
    bloodPressureSystolic: ['mmHg'],
    bloodPressureDiastolic: ['mmHg'],
    heartRate: ['bpm'],
    restingHeartRate: ['bpm'],
    bloodSugar: ['mg/dL'],
    fastingBloodSugar: ['mg/dL'],
    oxygenSaturation: ['%']
};

const AddBodyMetric = ({ getAllBodyMetricsHandler,setshowBMForm }) => {
    const { addBodyMetric } = useAppContext();
    const [data, setdata] = useState({
        type: '',
        value: 0,
        unit: '',
        recordedAt: ''
    });
    console.log("Date",data);
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name, value) => {
        setdata((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await addBodyMetric(data);
        if (res.data.success) {
            toast.success(res.data.message || 'Body metric added successfully');
            setdata({
                type: '',
                value: 0,
                unit: '',
                recordedAt: ''
            });
            getAllBodyMetricsHandler();
            setshowBMForm(false);
        } else {
            toast.error(res.data.message || 'Failed to add body metric');
        }
    };

    return (
        <div className="w-full">
            <Card className="border border-slate-200/80 bg-white/95 text-slate-900 shadow-2xl shadow-slate-200/70 dark:border-white/10 dark:bg-slate-900/95 dark:text-slate-50 dark:shadow-black/30">
                <CardHeader className="border-b border-slate-200/80 pb-5 dark:border-white/10">
                    <CardTitle className="text-2xl font-semibold">Add body metric</CardTitle>
                    <CardDescription className="text-sm text-slate-600 dark:text-slate-400">
                        Record a new measurement and keep your timeline updated.
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-5">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <FieldGroup className="grid gap-4 md:grid-cols-2">
                            <Field>
                                <FieldLabel>Type</FieldLabel>
                                <Select value={data.type || undefined} onValueChange={(value) => handleSelectChange('type', value)} required>
                                    <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
                                        <SelectValue placeholder="Select metric type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {METRIC_TYPES.map((type) => (
                                                <SelectItem value={type} key={type}>
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel>Value</FieldLabel>
                                <Input
                                    type="number"
                                    value={data.value}
                                    name="value"
                                    onChange={handleChange}
                                    required
                                    className="rounded-xl border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
                                />
                            </Field>

                            <Field>
                                <FieldLabel>Unit</FieldLabel>
                                <Select value={data.unit || undefined} onValueChange={(value) => handleSelectChange('unit', value)} required>
                                    <SelectTrigger className="w-full rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50">
                                        <SelectValue placeholder="Select unit" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {UNIT_MAP[data.type]
                                                ? UNIT_MAP[data.type].map((unit) => (
                                                    <SelectItem value={unit} key={unit}>
                                                        {unit}
                                                    </SelectItem>
                                                ))
                                                : null}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>

                            <Field>
                                <FieldLabel>Recorded At</FieldLabel>
                                <Input
                                    type="datetime-local"
                                    value={data.recordedAt}
                                    name="recordedAt"
                                    onChange={handleChange}
                                    className="rounded-xl border-slate-300 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-50"
                                />
                            </Field>
                        </FieldGroup>

                        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                            <p className="text-sm text-slate-600 dark:text-slate-400">Your entry will appear in the metrics timeline immediately after saving.</p>
                            <Button type="submit" className="rounded-full bg-cyan-600 px-5 text-sm font-medium text-white hover:bg-cyan-500 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400">
                                Save metric
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddBodyMetric;